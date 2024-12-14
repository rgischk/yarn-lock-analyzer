import { createAsyncThunk } from "@reduxjs/toolkit"
import { Lockfile } from "../types/Lockfile.ts"
import { lockfileSchema } from "../types/LockfileSchema.ts"
import jsyaml, { YAMLException } from "js-yaml"
import { ZodError } from "zod"
import {
  makeSerializableYAMLException,
  makeSerializableZodError,
  SerializableYAMLException,
  SerializableZodError,
} from "./parsingSlice.ts"

export const fileSelected = createAsyncThunk<
  Lockfile,
  File,
  {
    rejectValue: SerializableYAMLException | SerializableZodError
  }
>("fileSelected", async (file, thunkAPI) => {
  try {
    const fileText = await file.text()
    const yaml = jsyaml.load(fileText)
    return lockfileSchema.parse(yaml)
  } catch (error) {
    console.error("An error occurred while parsing the selected file.", error)

    if (error instanceof YAMLException) {
      return thunkAPI.rejectWithValue(makeSerializableYAMLException(error))
    } else if (error instanceof ZodError) {
      return thunkAPI.rejectWithValue(makeSerializableZodError(error))
    } else {
      throw error
    }
  }
})

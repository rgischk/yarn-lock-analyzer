import { createSlice, SerializedError } from "@reduxjs/toolkit"
import { fileSelected } from "./parsingSlice.fileSelectedThunk.ts"
import { YAMLException } from "js-yaml"
import { Lockfile } from "../types/Lockfile.ts"
import { ZodError } from "zod"

export type SerializableYAMLException = Omit<YAMLException, "toString">

export function makeSerializableYAMLException(
  yamlException: YAMLException,
): SerializableYAMLException {
  return { ...yamlException }
}

export type SerializableZodError = Pick<ZodError, "issues">

export function makeSerializableZodError(
  zodError: ZodError,
): SerializableZodError {
  return { issues: zodError.issues }
}

export function isSerializableYAMLException(
  error: SerializableYAMLException | SerializableZodError,
): error is SerializableYAMLException {
  return Boolean((error as SerializableYAMLException).name)
}

export interface ParsingState {
  parsing: boolean
  parsedLockfile?: Lockfile
  yamlParseError?: SerializableYAMLException
  schemaParseError?: SerializableZodError
  unknownParseError?: SerializedError
}

const initialState: ParsingState = {
  parsing: false,
}

export const parsingSlice = createSlice({
  name: "parsing",
  initialState,
  reducers: {
    clearParseError: (state) => {
      state.yamlParseError = undefined
      state.schemaParseError = undefined
      state.unknownParseError = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fileSelected.pending, (state) => {
      state.parsing = true
      state.parsedLockfile = undefined
      state.yamlParseError = undefined
      state.schemaParseError = undefined
      state.unknownParseError = undefined
    })
    builder.addCase(fileSelected.fulfilled, (state, action) => {
      state.parsedLockfile = action.payload
    })
    builder.addCase(fileSelected.rejected, (state, action) => {
      state.parsing = false
      const payload = action.payload
      if (payload) {
        if (isSerializableYAMLException(payload)) {
          state.yamlParseError = payload
        } else {
          state.schemaParseError = payload
        }
      } else {
        state.unknownParseError = action.error
      }
    })
  },
})

export const { clearParseError } = parsingSlice.actions

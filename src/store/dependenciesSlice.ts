import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dependency, Locator } from "../types/Dependency.ts"
import { fileSelected } from "./parsingSlice.fileSelectedThunk.ts"
import { buildDependencies } from "./buildDependencies.ts"
import { SearchItem } from "../types/SearchItem.ts"
import { addLocator, removeLocator } from "./utils.ts"

export interface DependenciesState {
  allDependencies: Array<Dependency>
  currentSearchItems: Array<SearchItem>
  expanded: Array<Locator>
}

const initialState: DependenciesState = {
  allDependencies: [],
  currentSearchItems: [],
  expanded: [],
}

export const dependenciesSlice = createSlice({
  name: "dependencies",
  initialState,
  reducers: {
    expand: (state, action: PayloadAction<Locator>) => {
      addLocator(state.expanded, action.payload)
    },
    collapse: (state, action: PayloadAction<Locator>) => {
      removeLocator(state.expanded, action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fileSelected.fulfilled, (state, action) => {
      state.allDependencies = buildDependencies(action.payload)
    })
  },
})

export const { expand, collapse } = dependenciesSlice.actions

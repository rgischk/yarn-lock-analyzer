import { configureStore } from "@reduxjs/toolkit"
import { parsingSlice } from "./parsingSlice.ts"
import { useDispatch } from "react-redux"
import { dependenciesSlice } from "./dependenciesSlice.ts"

export const store = configureStore({
  reducer: {
    lockfile: parsingSlice.reducer,
    dependencies: dependenciesSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export function useAppDispatch(): AppDispatch {
  return useDispatch()
}

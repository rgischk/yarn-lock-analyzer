import { RootState } from "./store.ts"

export function selectIsParsing(state: RootState) {
  return state.lockfile.parsing
}

export function selectIsError(state: RootState) {
  return Boolean(
    !state.lockfile.parsing &&
      !state.lockfile.parsedLockfile &&
      (state.lockfile.yamlParseError ||
        state.lockfile.schemaParseError ||
        state.lockfile.unknownParseError),
  )
}

export function selectParsedLockfile(state: RootState) {
  return state.lockfile.parsedLockfile
}

import { Dependency } from "./Dependency.ts"

export type TreeElement = {
  key: string
  level: number
  expansionState: ExpansionState
  dependency: Dependency
}

export type ExpansionState = "NOT_EXPANDABLE" | "EXPANDED" | "COLLAPSED"

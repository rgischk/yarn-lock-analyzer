import { SearchItem } from "../types/SearchItem.ts"
import { RootState } from "./store.ts"
import { createSelector } from "@reduxjs/toolkit"
import { ExpansionState, TreeElement } from "../types/TreeElement.ts"
import {Dependency, Locator} from "../types/Dependency.ts"
import {containsLocator, findDependency} from "./utils.ts"

export const selectAllPossibleSearchItems: (
  state: RootState,
) => Array<SearchItem> = createSelector(
  [(state: RootState) => state.dependencies.allDependencies],
  (allDependencies) => {
    const searchItems: Array<SearchItem> = []
    allDependencies.forEach((dependency) => {
      const searchItem: SearchItem = {
        label: dependency.id.scopedName,
        scopedName: dependency.id.scopedName,
      }
      const searchItemWithVersion: SearchItem = {
        label: `${dependency.id.scopedName}@${dependency.id.version}`,
        scopedName: dependency.id.scopedName,
        version: dependency.id.version,
      }
      if (
        !searchItems.some(
          (existingSearchItem) => existingSearchItem.label === searchItem.label,
        )
      ) {
        searchItems.push(searchItem)
      }
      searchItems.push(searchItemWithVersion)
    })
    return searchItems
  },
)

export function selectCurrentSearchItems(state: RootState): Array<SearchItem> {
  return state.dependencies.currentSearchItems
}

export const selectTreeElements: (state: RootState) => Array<TreeElement> =
  createSelector(
    [
      (state: RootState) => state.dependencies.allDependencies,
      (state: RootState) => state.dependencies.currentSearchItems,
      (state: RootState) => state.dependencies.expanded,
    ],
    (allDependencies, currentSearchItems, expanded) => {
      console.log("Ignoring currentSearchItems!", { currentSearchItems }) // TODO Implement this
      const rootDependencies = allDependencies.filter((dependency) =>
        isRoot(dependency),
      )
      const treeElements: Array<TreeElement> = []
      rootDependencies.forEach((rootDependency) => {
        addTreeElementWithChildren(
          treeElements,
          allDependencies,
          expanded,
          0,
          rootDependency,
        )
      })
      return treeElements
    },
  )

function addTreeElementWithChildren(
  treeElements: Array<TreeElement>,
  allDependencies: Array<Dependency>,
  expanded: Array<Locator>,
  level: number,
  currentDependency: Dependency,
) {
  if (currentDependency.dependencies.length === 0) {
    treeElements.push(
      buildTreeElement(currentDependency, level, "NOT_EXPANDABLE"),
    )
  } else {
    const isExpanded = containsLocator(expanded, currentDependency.id)
    treeElements.push(buildTreeElement(currentDependency, level, isExpanded ? "EXPANDED" : "COLLAPSED"))
    if (isExpanded) {
      currentDependency.dependencies.forEach((childDependencyResolution) => {
        const childDependency = findDependency(
          allDependencies,
          childDependencyResolution.result,
        )
        addTreeElementWithChildren(
          treeElements,
          allDependencies,
          expanded,
          level + 1,
          childDependency,
        )
      })
    }
  }
}

function buildTreeElement(
  dependency: Dependency,
  level: number,
  expansionState: ExpansionState,
): TreeElement {
  return {
    key: `${dependency.id.scopedName}@${dependency.id.version}`,
    level,
    expansionState,
    dependency,
  }
}

function isRoot(dependency: Dependency): boolean {
  return dependency.dependents.length === 0
}

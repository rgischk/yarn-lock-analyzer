import { Dependency, Locator } from "../types/Dependency.ts"

export function findDependency(
  dependencies: Array<Dependency>,
  locator: Locator,
): Dependency {
  const result = dependencies.find((dependency) =>
    isSameLocator(dependency.id, locator),
  )
  if (!result) {
    throw new Error("Did not find expected dependency!")
  }
  return result
}

export function isSameLocator(left: Locator, right: Locator) {
  return left.scopedName === right.scopedName && left.version === right.version
}

export function containsLocator(list: Array<Locator>, item: Locator): boolean {
  return list.some((otherItem) => isSameLocator(item, otherItem))
}

export function addLocator(list: Array<Locator>, item: Locator): void {
  if (!containsLocator(list, item)) {
    list.push(item)
  }
}

export function removeLocator(list: Array<Locator>, item: Locator): void {
  const index = list.findIndex((otherItem) => isSameLocator(item, otherItem))
  if (index >= 0) {
    list.splice(index, 1)
  }
}

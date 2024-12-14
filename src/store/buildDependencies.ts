import {
  Lockfile,
  LockfileDependencies,
  LockfileEntry,
} from "../types/Lockfile.ts"
import {
  Dependency,
  Dependent,
  Resolution,
  Locator,
  Descriptor,
} from "../types/Dependency.ts"

type UnresolvedDependency = {
  id: Locator
  requested: Array<Descriptor>
  rawDependencies: LockfileDependencies
}

export function buildDependencies(lockfile: Lockfile): Array<Dependency> {
  const unresolvedDependencies = buildUnresolvedDependencies(lockfile)
  return resolveDependencies(unresolvedDependencies)
}

function buildUnresolvedDependencies(
  lockfile: Lockfile,
): Array<UnresolvedDependency> {
  return Object.entries(lockfile)
    .filter(([locatorList]) => "__metadata" !== locatorList)
    .map(([locatorList, lockFileEntry]) =>
      buildUnresolvedDependency(locatorList, lockFileEntry as LockfileEntry),
    )
}

function buildUnresolvedDependency(
  locatorListAsString: string,
  lockFileEntry: LockfileEntry,
): UnresolvedDependency {
  const requested = parseLocatorList(locatorListAsString)
  const resolved = parseLocator(lockFileEntry.resolution)

  return {
    id: resolved,
    requested,
    rawDependencies: lockFileEntry.dependencies || {},
  }
}

function parseLocatorList(locatorList: string): Array<Descriptor> {
  return locatorList
    .split(",")
    .map((locator) => locator.trim())
    .map((locator) => parseDescriptor(locator))
}

function parseDescriptor(descriptor: string): Descriptor {
  const { scopedName, version } = parseLocator(descriptor)
  return { scopedName, versionRange: version }
}

function parseLocator(locator: string): Locator {
  const separatorIndex = locator.indexOf("@", 1)
  if (separatorIndex < 0) {
    throw new Error(`Invalid entry in lockfile! locator: ${locator}`)
  }
  const scopedName = locator.substring(0, separatorIndex)
  const version = locator.substring(separatorIndex + 1)
  return { scopedName, version }
}

function resolveDependencies(
  unresolvedDependencies: Array<UnresolvedDependency>,
): Array<Dependency> {
  return unresolvedDependencies.map((tempDependency) =>
    resolveDependency(tempDependency, unresolvedDependencies),
  )
}

function resolveDependency(
  dependency: UnresolvedDependency,
  allDependencies: Array<UnresolvedDependency>,
): Dependency {
  const resolvedDependencies = findDependencies(dependency, allDependencies)
  const resolvedDependents = findDependents(dependency, allDependencies)
  return {
    id: dependency.id,
    dependencies: resolvedDependencies,
    dependents: resolvedDependents,
  }
}

function findDependents(
  dependency: UnresolvedDependency,
  allDependencies: Array<UnresolvedDependency>,
): Array<Dependent> {
  return dependency.requested.flatMap((request) => {
    return allDependencies
      .filter((dependency) => isDependent(dependency, request))
      .map((dependent) => {
        return {
          request,
          dependent: dependent.id,
        }
      })
  })
}

function isDependent(
  potentialDependent: UnresolvedDependency,
  request: Descriptor,
): boolean {
  return Object.entries(potentialDependent.rawDependencies).some(
    ([scopedName, versionRange]) => {
      return (
        request.scopedName === scopedName &&
        request.versionRange === versionRange
      )
    },
  )
}

function findDependencies(
  dependency: UnresolvedDependency,
  allDependencies: Array<UnresolvedDependency>,
): Array<Resolution> {
  return Object.entries(dependency.rawDependencies).map(
    ([scopedName, versionRange]) => {
      const unresolvedDependency: Descriptor = {
        scopedName,
        versionRange,
      }
      const foundDependency = allDependencies.find((dependency) =>
        isDependency(dependency, unresolvedDependency),
      )
      if (!foundDependency) {
        throw new Error(
          `Did not find dependency! request: {scopedName: ${scopedName}, version: ${versionRange}}`,
        )
      }
      return {
        request: unresolvedDependency,
        result: foundDependency.id,
      }
    },
  )
}

function isDependency(
  potentialDependency: UnresolvedDependency,
  request: Descriptor,
): boolean {
  return potentialDependency.requested.some(
    (requested) =>
      requested.scopedName === request.scopedName &&
      requested.versionRange === request.versionRange,
  )
}

export type Dependency = {
  id: Locator
  dependents: Array<Dependent>
  dependencies: Array<Resolution>
  // lineNumber: number TODO Add in the future
}

export type Dependent = {
  dependent: Locator
  request: Descriptor
}

export type Resolution = {
  request: Descriptor
  result: Locator
}

export type Locator = {
  scopedName: string
  version: string
}

export type Descriptor = {
  scopedName: string
  versionRange: string
}

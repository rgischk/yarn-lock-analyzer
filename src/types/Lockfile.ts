export type Lockfile = LockfileContents & {
  __metadata: LockfileMetadata
}

export type LockfileMetadata = {
  version: number
  cacheKey: string
}

export type LockfileContents = {
  [locatorList: string]: LockfileEntry
}

export type LockfileEntry = {
  dependencies?: LockfileDependencies
  version: string
  checksum?: string
  languageName: string
  linkType: string
  resolution: string
  conditions?: string
}

export type LockfileDependencies = {
  [scopedName: string]: string
}

import { z } from "zod"

export const lockfileMetadataSchema = z.object({
  version: z.number(),
  cacheKey: z.string(),
})

export const lockfileDependenciesSchema = z.record(z.string(), z.string())

export const lockfileEntrySchema = z.object({
  dependencies: lockfileDependenciesSchema.optional(),
  version: z.string(),
  checksum: z.string().optional(),
  languageName: z.string(),
  linkType: z.string(),
  resolution: z.string(),
  conditions: z.string().optional(),
})

export const lockfileSchema = z
  .object({
    __metadata: lockfileMetadataSchema,
  })
  .catchall(lockfileEntrySchema)

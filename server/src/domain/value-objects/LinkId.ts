import { z } from 'zod'

export const LinkIdSchema = z.string()
  .min(3)
  .max(50)
  .regex(/^[a-zA-Z0-9_-]+$/)

export type LinkId = z.infer<typeof LinkIdSchema>

export const LinkIdDomain = {
  create: (value: string): LinkId => {
    return LinkIdSchema.parse(value)
  },

  equals: (id1: LinkId, id2: LinkId): boolean => {
    return id1 === id2
  },

  toString: (id: LinkId): string => {
    return id
  }
}

import { z } from 'zod'

export const UserIdSchema = z.string()
  .min(3)
  .max(50)
  .regex(/^[a-zA-Z0-9_-]+$/)

export type UserId = z.infer<typeof UserIdSchema>

export const UserIdDomain = {
  create: (value: string): UserId => {
    return UserIdSchema.parse(value)
  },

  equals: (id1: UserId, id2: UserId): boolean => {
    return id1 === id2
  },

  toString: (id: UserId): string => {
    return id
  }
}

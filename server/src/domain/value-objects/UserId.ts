import { UserIdSchema, UserId } from 'shared'

export const UserIdDomain = {
  create: (value: string): UserId => {
    return UserIdSchema.parse(value)
  },

  equals: (id1: UserId, id2: UserId): boolean => {
    return id1 === id2
  },

  toString: (id: UserId): string => {
    return id
  },
}

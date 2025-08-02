import { LinkIdSchema, LinkId } from 'shared'

export const LinkIdDomain = {
  create: (value: string): LinkId => {
    return LinkIdSchema.parse(value)
  },

  equals: (id1: LinkId, id2: LinkId): boolean => {
    return id1 === id2
  },

  toString: (id: LinkId): string => {
    return id
  },
}

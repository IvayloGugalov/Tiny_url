import { LinkIdDomain } from '../value-objects/LinkId'
import { UrlDomain } from '../value-objects/Url'
import { LinkSchema, Link } from 'shared'
import { LinkExpiredError } from '../errors'

export const LinkDomain = {
  create: (id: string, target: string, userId?: string): Link => {
    const validId = LinkIdDomain.create(id)
    const validTarget = UrlDomain.create(target)

    return {
      id: validId,
      target: validTarget,
      clicks: 0,
      userId: userId,
      createdAt: new Date(),
    }
  },

  fromPersistence: (data: unknown): Link => {
    return LinkSchema.parse(data)
  },

  incrementClicks: (link: Link): Link => {
    return {
      ...link,
      clicks: link.clicks + 1,
    }
  },

  isExpired: (link: Link, ttlDays: number): boolean => {
    const expirationDate = new Date(link.createdAt)
    expirationDate.setDate(expirationDate.getDate() + ttlDays)
    return new Date() > expirationDate
  },

  validateNotExpired: (link: Link, ttlDays: number): void => {
    if (LinkDomain.isExpired(link, ttlDays)) {
      throw new LinkExpiredError(link.id)
    }
  },

  calculateExpirationDate: (link: Link, ttlDays: number): Date => {
    const expirationDate = new Date(link.createdAt)
    expirationDate.setDate(expirationDate.getDate() + ttlDays)
    return expirationDate
  },
}

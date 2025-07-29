import { z } from 'zod'
import { LinkExpiredError } from '../errors'
import { LinkIdSchema, LinkIdDomain } from '../value-objects/LinkId'
import { UrlSchema, UrlDomain } from '../value-objects/Url'
import { UserIdSchema } from '../value-objects/UserId'

export const LinkSchema = z.object({
  id: LinkIdSchema,
  target: UrlSchema,
  clicks: z.number().int().min(0),
  userId: UserIdSchema.optional(),
  createdAt: z.date()
})

export type Link = z.infer<typeof LinkSchema>

export const LinkDomain = {
  create: (id: string, target: string, userId?: string): Link => {
    const validId = LinkIdDomain.create(id)
    const validTarget = UrlDomain.create(target)

    return {
      id: validId,
      target: validTarget,
      clicks: 0,
      userId: userId,
      createdAt: new Date()
    }
  },

  fromPersistence: (data: unknown): Link => {
    return LinkSchema.parse(data)
  },

  incrementClicks: (link: Link): Link => {
    return {
      ...link,
      clicks: link.clicks + 1
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
  }
}

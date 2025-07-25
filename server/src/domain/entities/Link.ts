import { z } from 'zod'
import { LinkExpiredError } from '../errors'
import { LinkIdSchema, UrlSchema } from '../value-objects'

export const LinkSchema = z.object({
  id: LinkIdSchema,
  target: UrlSchema,
  clicks: z.number().int().min(0),
  createdAt: z.date()
})

export type Link = z.infer<typeof LinkSchema>

export const LinkDomain = {
  create: (id: string, target: string): Link => {
    return LinkSchema.parse({
      id,
      target,
      clicks: 0,
      createdAt: new Date()
    })
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

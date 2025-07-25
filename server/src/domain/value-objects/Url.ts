import { z } from 'zod'
import { InvalidUrlError } from '../errors'

export const UrlSchema = z.string()
  .min(1)
  .max(2048)
  .transform(val => val.trim())
  .refine((url) => {
    try {
      const urlObj = new URL(url)
      return ['http:', 'https:'].includes(urlObj.protocol) && urlObj.hostname.length > 0
    } catch {
      return false
    }
  })

export type Url = z.infer<typeof UrlSchema>

export const UrlDomain = {
  create: (value: string): Url => {
    try {
      return UrlSchema.parse(value)
    } catch {
      throw new InvalidUrlError(value)
    }
  },

  equals: (url1: Url, url2: Url): boolean => {
    return url1 === url2
  },

  toString: (url: Url): string => {
    return url
  },

  getDomain: (url: Url): string => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname
    } catch {
      throw new InvalidUrlError(url)
    }
  }
}

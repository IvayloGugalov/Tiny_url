import { InvalidUrlError } from '../errors'
import { UrlSchema, Url } from 'shared'

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
  },
}

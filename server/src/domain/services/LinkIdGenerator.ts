import type { LinkId } from '../value-objects'
import { LinkIdDomain } from '../value-objects'

export class ShortLinkIdGenerator {
  private readonly alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  private readonly defaultLength = 6

  generate(length: number = this.defaultLength): LinkId {
    let result = ''
    for (let i = 0; i < length; i++) {
      result += this.alphabet.charAt(Math.floor(Math.random() * this.alphabet.length))
    }
    return LinkIdDomain.create(result)
  }
}

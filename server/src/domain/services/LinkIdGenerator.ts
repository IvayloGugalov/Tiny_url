import { LinkIdDomain } from '../value-objects/LinkId'
import { LinkId } from 'shared'

export class ShortLinkIdGenerator {
  private readonly alphabet =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  private readonly defaultLength = 6

  generate(): LinkId {
    let result = ''
    for (let i = 0; i < this.defaultLength; i++) {
      result += this.alphabet.charAt(
        Math.floor(Math.random() * this.alphabet.length),
      )
    }
    return LinkIdDomain.create(result)
  }
}

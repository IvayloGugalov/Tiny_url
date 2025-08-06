import { LinkIdDomain } from '../value-objects/LinkId'
import { LinkId } from 'shared'
import { alphabet } from 'shared'

export class ShortLinkIdGenerator {
  private readonly defaultLength = 6

  generate(): LinkId {
    let result = ''
    for (let i = 0; i < this.defaultLength; i++) {
      result += alphabet.charAt(
        Math.floor(Math.random() * alphabet.length),
      )
    }
    return LinkIdDomain.create(result)
  }
}

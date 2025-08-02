import type { LinkId } from 'shared'

export class MockLinkIdGenerator {
  private nextId = 1

  generate(): LinkId {
    return `mock-link-${this.nextId++}` as LinkId
  }

  reset(): void {
    this.nextId = 1
  }
}

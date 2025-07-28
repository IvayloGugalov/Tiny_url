import type { LinkId } from 'domain/value-objects/LinkId'
import { LinkIdDomain } from 'domain/value-objects/LinkId'

export class MockLinkIdGenerator {
  private generatedIds: string[] = []
  private currentIndex = 0
  private shouldGenerateUnique = true

  generate(length: number = 6): LinkId {
    if (this.generatedIds.length > 0) {
      const id = this.generatedIds[this.currentIndex % this.generatedIds.length]!
      this.currentIndex++
      return LinkIdDomain.create(id)
    }

    // Default behavior: generate a predictable ID for testing
    const id = this.shouldGenerateUnique
      ? `test${this.currentIndex.toString().padStart(2, '0')}`
      : 'test01'

    this.currentIndex++
    return LinkIdDomain.create(id)
  }

  // Test helper methods
  setGeneratedIds(ids: string[]): void {
    this.generatedIds = ids
    this.currentIndex = 0
  }

  setShouldGenerateUnique(should: boolean): void {
    this.shouldGenerateUnique = should
  }

  reset(): void {
    this.generatedIds = []
    this.currentIndex = 0
    this.shouldGenerateUnique = true
  }

  getGeneratedCount(): number {
    return this.currentIndex
  }
}

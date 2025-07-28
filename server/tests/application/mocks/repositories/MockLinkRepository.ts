import type { ILinkRepository } from 'application/interfaces/ILinkRepository'
import type { Link } from 'domain/entities/Link'
import type { LinkId } from 'domain/value-objects/LinkId'

export class MockLinkRepository implements ILinkRepository {
  private links: Map<string, Link> = new Map()

  async save(link: Link): Promise<void> {
    this.links.set(link.id, { ...link })
  }

  async findById(id: LinkId): Promise<Link | null> {
    const link = this.links.get(id)
    return link ? { ...link } : null
  }

  async findAll(): Promise<Link[]> {
    return Array.from(this.links.values()).map(link => ({ ...link }))
  }

  async existsById(id: LinkId): Promise<boolean> {
    return this.links.has(id)
  }

  async deleteExpiredLinks(cutoffDate: Date): Promise<number> {
    let deletedCount = 0
    for (const [id, link] of this.links.entries()) {
      if (link.createdAt < cutoffDate) {
        this.links.delete(id)
        deletedCount++
      }
    }
    return deletedCount
  }

  async update(link: Link): Promise<void> {
    if (this.links.has(link.id)) {
      this.links.set(link.id, { ...link })
    }
  }

  // Test helper methods
  clear(): void {
    this.links.clear()
  }

  getAll(): Link[] {
    return Array.from(this.links.values())
  }

  size(): number {
    return this.links.size
  }
}

import type { ILinkRepository } from 'application/interfaces/ILinkRepository'
import type { Link, LinkId, UserId } from 'shared'

export class MockLinkRepository implements ILinkRepository {
  private links: Link[] = []

  async create(link: Link): Promise<Link> {
    this.links.push(link)
    return link
  }

  async findById(id: LinkId): Promise<Link | null> {
    return this.links.find((link) => link.id === id) || null
  }

  async findByUserId(userId: UserId): Promise<Link[]> {
    return this.links.filter((link) => link.userId === userId)
  }

  async findAll(): Promise<Link[]> {
    return [...this.links]
  }

  async update(link: Link): Promise<Link> {
    const index = this.links.findIndex((l) => l.id === link.id)
    if (index !== -1) {
      this.links[index] = link
    }
    return link
  }

  async delete(id: LinkId): Promise<void> {
    this.links = this.links.filter((link) => link.id !== id)
  }

  async deleteExpired(ttlDays: number): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - ttlDays)

    const expiredCount = this.links.filter(
      (link) => link.createdAt <= cutoffDate,
    ).length
    this.links = this.links.filter((link) => link.createdAt > cutoffDate)

    return expiredCount
  }

  clear(): void {
    this.links = []
  }
}

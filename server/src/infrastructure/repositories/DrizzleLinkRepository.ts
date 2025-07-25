import { eq, lt } from 'drizzle-orm'
import { Link, LinkDomain } from '../../domain/entities/Link'
import { ILinkRepository } from '../../application/interfaces/ILinkRepository'
import { DatabaseConnection } from '../database/connection'
import { links } from '../database/schema'
import { LinkId } from '@server/domain/value-objects'

export class DrizzleLinkRepository implements ILinkRepository {
  private db = DatabaseConnection.getInstance().db

  async save(link: Link): Promise<void> {
    await this.db
      .insert(links)
      .values({
        id: link.id,
        target: link.target,
        clicks: link.clicks,
        createdAt: link.createdAt,
      })
  }

  async findById(id: LinkId): Promise<Link | null> {
    const result = await this.db
      .select()
      .from(links)
      .where(eq(links.id, id))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    const row = result[0]!
    return LinkDomain.fromPersistence({
      id: row.id,
      target: row.target,
      clicks: row.clicks,
      createdAt: row.createdAt,
    })
  }

  async findAll(): Promise<Link[]> {
    const result = await this.db.select().from(links)

    return result.map(row =>
      LinkDomain.fromPersistence({
        id: row.id,
        target: row.target,
        clicks: row.clicks,
        createdAt: row.createdAt,
      })
    )
  }

  async existsById(id: LinkId): Promise<boolean> {
    const result = await this.db
      .select({ id: links.id })
      .from(links)
      .where(eq(links.id, id))
      .limit(1)

    return result.length > 0
  }

  async deleteExpiredLinks(cutoffDate: Date): Promise<number> {
    const result = await this.db
      .delete(links)
      .where(lt(links.createdAt, cutoffDate))
      .returning()

    return result.length
  }

  async update(link: Link): Promise<void> {
    await this.db
      .update(links)
      .set({
        target: link.target,
        clicks: link.clicks,
      })
      .where(eq(links.id, link.id))
  }
}

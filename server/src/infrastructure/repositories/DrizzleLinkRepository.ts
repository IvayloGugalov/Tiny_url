import { eq, lt } from 'drizzle-orm'
import { LinkDomain } from 'domain/entities/Link'
import { Link, LinkId, UserId } from 'shared'
import { ILinkRepository } from 'application/interfaces/ILinkRepository'
import { db, type Transaction } from 'infrastructure/database/connection'
import { links as linksTable } from 'infrastructure/database/schema'

export class DrizzleLinkRepository implements ILinkRepository {
  async create(link: Link, tx?: Transaction): Promise<Link> {
    const dbInstance = tx || db
    const [result] = await dbInstance
      .insert(linksTable)
      .values({
        id: link.id,
        target: link.target,
        clicks: link.clicks,
        userId: link.userId,
        createdAt: link.createdAt,
      })
      .returning()

    return LinkDomain.fromPersistence(result)
  }

  async findById(id: LinkId, tx?: Transaction): Promise<Link | null> {
    const dbInstance = tx || db
    const result = await dbInstance
      .select()
      .from(linksTable)
      .where(eq(linksTable.id, id))
      .limit(1)
    return result.length > 0 ? LinkDomain.fromPersistence(result[0]) : null
  }

  async findByUserId(userId: UserId, tx?: Transaction): Promise<Link[]> {
    const dbInstance = tx || db
    const result = await dbInstance
      .select()
      .from(linksTable)
      .where(eq(linksTable.userId, userId))
    return result.map((row) => LinkDomain.fromPersistence(row))
  }

  async findAll(tx?: Transaction): Promise<Link[]> {
    const dbInstance = tx || db
    const result = await dbInstance.select().from(linksTable)
    return result.map((row) => LinkDomain.fromPersistence(row))
  }

  async update(link: Link, tx?: Transaction): Promise<Link> {
    const dbInstance = tx || db
    const [result] = await dbInstance
      .update(linksTable)
      .set({
        target: link.target,
        clicks: link.clicks,
        userId: link.userId,
      })
      .where(eq(linksTable.id, link.id))
      .returning()

    return LinkDomain.fromPersistence(result)
  }

  async delete(id: LinkId, tx?: Transaction): Promise<void> {
    const dbInstance = tx || db
    await dbInstance.delete(linksTable).where(eq(linksTable.id, id))
  }

  async deleteExpired(ttlDays: number, tx?: Transaction): Promise<number> {
    const dbInstance = tx || db
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - ttlDays)

    const result = await dbInstance
      .delete(linksTable)
      .where(lt(linksTable.createdAt, cutoffDate))
      .returning()

    return result.length
  }
}

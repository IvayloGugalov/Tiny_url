import { eq, lt } from 'drizzle-orm'
import { links } from '../db/schema'
import { BaseRepository } from './base'
import { NotFoundError } from '../utils/errors'
import { logger } from '../services/logger'

export interface CreateLinkData {
  id: string
  target: string
}

export interface LinkData {
  id: string
  target: string
  clicks: number
  createdAt: Date
}

export class LinkRepository extends BaseRepository {
  async create(data: CreateLinkData): Promise<LinkData> {
    try {
      const [link] = await this.db
        .insert(links)
        .values(data)
        .returning()

      logger.debug('Link created in database', { id: link.id, target: link.target })
      
      return {
        id: link.id,
        target: link.target,
        clicks: link.clicks,
        createdAt: link.createdAt,
      }
    } catch (error) {
      logger.error('Failed to create link', error)
      throw error
    }
  }

  async findById(id: string): Promise<LinkData | null> {
    try {
      const link = await this.db
        .select()
        .from(links)
        .where(eq(links.id, id))
        .get()

      if (!link) {
        return null
      }

      return {
        id: link.id,
        target: link.target,
        clicks: link.clicks,
        createdAt: link.createdAt,
      }
    } catch (error) {
      logger.error('Failed to find link by id', { id, error })
      throw error
    }
  }

  async findAll(): Promise<LinkData[]> {
    try {
      const allLinks = await this.db.select().from(links).all()
      
      return allLinks.map(link => ({
        id: link.id,
        target: link.target,
        clicks: link.clicks,
        createdAt: link.createdAt,
      }))
    } catch (error) {
      logger.error('Failed to fetch all links', error)
      throw error
    }
  }

  async incrementClicks(id: string): Promise<void> {
    try {
      const link = await this.findById(id)
      if (!link) {
        throw new NotFoundError('Link')
      }

      await this.db
        .update(links)
        .set({ clicks: link.clicks + 1 })
        .where(eq(links.id, id))
        .run()

      logger.debug('Link clicks incremented', { id, newCount: link.clicks + 1 })
    } catch (error) {
      logger.error('Failed to increment link clicks', { id, error })
      throw error
    }
  }

  async deleteExpired(cutoffDate: Date): Promise<number> {
    try {
      const result = await this.db
        .delete(links)
        .where(lt(links.createdAt, cutoffDate))
        .run()

      logger.info('Expired links deleted', { count: result.changes, cutoffDate })
      return result.changes
    } catch (error) {
      logger.error('Failed to delete expired links', { cutoffDate, error })
      throw error
    }
  }

  async existsById(id: string): Promise<boolean> {
    try {
      const link = await this.db
        .select({ id: links.id })
        .from(links)
        .where(eq(links.id, id))
        .get()

      return !!link
    } catch (error) {
      logger.error('Failed to check if link exists', { id, error })
      throw error
    }
  }
}

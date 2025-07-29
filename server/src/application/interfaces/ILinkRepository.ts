import type { Link } from 'domain/entities/Link'
import type { LinkId } from 'domain/value-objects/LinkId'
import type { UserId } from 'domain/value-objects/UserId'

export interface ILinkRepository {
  save(link: Link): Promise<void>
  findById(id: LinkId): Promise<Link | null>
  findAll(): Promise<Link[]>
  findByUserId(userId: UserId): Promise<Link[]>
  existsById(id: LinkId): Promise<boolean>
  deleteExpiredLinks(cutoffDate: Date): Promise<number>
  update(link: Link): Promise<void>
}

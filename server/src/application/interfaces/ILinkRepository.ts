import type { Link } from 'domain/entities/Link'
import type { LinkId } from 'domain/value-objects/LinkId'

export interface ILinkRepository {
  save(link: Link): Promise<void>
  findById(id: LinkId): Promise<Link | null>
  findAll(): Promise<Link[]>
  existsById(id: LinkId): Promise<boolean>
  deleteExpiredLinks(cutoffDate: Date): Promise<number>
  update(link: Link): Promise<void>
}

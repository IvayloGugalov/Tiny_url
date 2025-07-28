import type { Link } from 'domain/entities/Link'

export interface LinkResponse {
  id: string
  target: string
  clicks: number
  createdAt: string
}

export class LinkPresenter {
  static toResponse(link: Link): LinkResponse {
    return {
      id: link.id,
      target: link.target,
      clicks: link.clicks,
      createdAt: link.createdAt.toISOString()
    }
  }

  static toResponseList(links: Link[]): LinkResponse[] {
    return links.map(link => this.toResponse(link))
  }
}

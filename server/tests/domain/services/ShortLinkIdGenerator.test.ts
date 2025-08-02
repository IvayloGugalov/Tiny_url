import { describe, it, expect, beforeEach } from 'vitest'
import { ShortLinkIdGenerator } from 'domain/services/LinkIdGenerator'

describe('ShortLinkIdGenerator', () => {
  let generator: ShortLinkIdGenerator

  beforeEach(() => {
    generator = new ShortLinkIdGenerator()
  })

  describe('generate', () => {
    it('should generate a link ID', () => {
      const id = generator.generate()
      expect(id).toBeDefined()
      expect(typeof id).toBe('string')
      expect(id.length).toBeGreaterThan(0)
    })

    it('should generate different IDs on subsequent calls', () => {
      const id1 = generator.generate()
      const id2 = generator.generate()
      expect(id1).not.toBe(id2)
    })

    it('should generate IDs with valid format', () => {
      const id = generator.generate()
      expect(id).toMatch(/^[a-zA-Z0-9_-]+$/)
    })

    it('should generate IDs with consistent length', () => {
      const id1 = generator.generate()
      const id2 = generator.generate()
      expect(id1.length).toBe(id2.length)
    })
  })
})

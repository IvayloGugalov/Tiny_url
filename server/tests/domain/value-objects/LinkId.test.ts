import { describe, it, expect } from 'vitest'
import { LinkIdDomain } from 'domain/value-objects/LinkId'

describe('LinkIdDomain', () => {
  const validLinkIds = ['abc123', 'test01', 'link_1', 'short-url']

  const invalidLinkIds = [
    '',
    'ab', // too short
    'a'.repeat(51), // too long
    'invalid@id',
    'id with spaces',
    'id#with$special%chars',
  ]

  describe('create', () => {
    validLinkIds.forEach((id) => {
      it(`should create valid link ID: ${id}`, () => {
        const result = LinkIdDomain.create(id)
        expect(result).toBe(id)
      })
    })

    invalidLinkIds.forEach((id) => {
      it(`should reject invalid link ID: ${id}`, () => {
        expect(() => LinkIdDomain.create(id)).toThrow()
      })
    })
  })

  describe('equals', () => {
    it('should return true for identical IDs', () => {
      const id1 = LinkIdDomain.create('test01')
      const id2 = LinkIdDomain.create('test01')

      expect(LinkIdDomain.equals(id1, id2)).toBe(true)
    })

    it('should return false for different IDs', () => {
      const id1 = LinkIdDomain.create('test01')
      const id2 = LinkIdDomain.create('test02')

      expect(LinkIdDomain.equals(id1, id2)).toBe(false)
    })
  })

  describe('toString', () => {
    it('should return the ID string', () => {
      const id = LinkIdDomain.create('test01')
      expect(LinkIdDomain.toString(id)).toBe('test01')
    })
  })
})

import { expect, vi } from 'vitest'
import type { DomainError } from '@/domain/errors'

export const TestHelpers = {
  // Error testing helpers
  expectDomainError: async (
    fn: () => Promise<any> | any,
    expectedErrorCode: string,
    expectedMessage?: string,
  ): Promise<void> => {
    try {
      await fn()
      expect.fail('Expected function to throw an error')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      const domainError = error as DomainError
      expect(domainError.code).toBe(expectedErrorCode)
      if (expectedMessage) {
        expect(domainError.message).toContain(expectedMessage)
      }
    }
  },

  expectError: async (
    fn: () => Promise<any> | any,
    expectedMessage?: string,
  ): Promise<void> => {
    try {
      await fn()
      expect.fail('Expected function to throw an error')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      if (expectedMessage) {
        expect((error as Error).message).toContain(expectedMessage)
      }
    }
  },

  // Date testing helpers
  expectDateToBeRecent: (date: Date, toleranceMs: number = 1000): void => {
    const now = new Date()
    const diff = Math.abs(now.getTime() - date.getTime())
    expect(diff).toBeLessThan(toleranceMs)
  },

  expectDateToBeBefore: (date1: Date, date2: Date): void => {
    expect(date1.getTime()).toBeLessThan(date2.getTime())
  },

  expectDateToBeAfter: (date1: Date, date2: Date): void => {
    expect(date1.getTime()).toBeGreaterThan(date2.getTime())
  },

  // Object testing helpers
  expectObjectToMatch: <T>(actual: T, expected: Partial<T>): void => {
    for (const [key, value] of Object.entries(expected)) {
      expect((actual as any)[key]).toEqual(value)
    }
  },

  // Array testing helpers
  expectArrayToContainObject: <T>(
    array: T[],
    expectedObject: Partial<T>,
  ): void => {
    const found = array.some((item) => {
      return Object.entries(expectedObject).every(([key, value]) => {
        return (item as any)[key] === value
      })
    })
    expect(found).toBe(true)
  },

  // Mock helpers
  createMockFunction: <T extends (...args: any[]) => any>(
    implementation?: T,
  ) => {
    return vi.fn(implementation)
  },

  // Time manipulation helpers
  freezeTime: (date: Date): void => {
    vi.useFakeTimers()
    vi.setSystemTime(date)
  },

  restoreTime: (): void => {
    vi.useRealTimers()
  },

  // Async testing helpers
  waitFor: async (
    condition: () => boolean | Promise<boolean>,
    timeout: number = 1000,
    interval: number = 10,
  ): Promise<void> => {
    const start = Date.now()
    while (Date.now() - start < timeout) {
      if (await condition()) {
        return
      }
      await new Promise((resolve) => setTimeout(resolve, interval))
    }
    throw new Error(`Condition not met within ${timeout}ms`)
  },
}

import fc from 'fast-check'

// Generators for common types

export const generators = {
  // Positive integers
  positiveInt: fc.integer({ min: 1, max: 10000 }),

  // Non-negative integers
  nonNegativeInt: fc.integer({ min: 0, max: 10000 }),

  // Positive floats
  positiveFloat: fc.float({ min: 0.01, max: 10000 }),

  // Currency amounts (2 decimal places)
  currencyAmount: fc.float({ min: 0, max: 10000 }).map(n => Math.round(n * 100) / 100),

  // Strings
  nonEmptyString: fc.string({ minLength: 1, maxLength: 100 }),

  // Email addresses
  email: fc.emailAddress(),

  // Phone numbers (simple format)
  phoneNumber: fc.string({ minLength: 10, maxLength: 15 }).map(s => s.replace(/\D/g, '')),

  // Order statuses
  orderStatus: fc.constantFrom('pending', 'confirmed', 'picked_up', 'in_transit', 'delivered', 'cancelled'),

  // Dates within a range
  dateRange: (min: Date, max: Date) => fc.date({ min, max }),

  // Arrays with generators
  arrayOf: <T>(gen: fc.Arbitrary<T>, minLength = 0, maxLength = 10) =>
    fc.array(gen, { minLength, maxLength }),
}

// Helper functions

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`)
}

export function withSetup<T>(setupFn: () => T, teardownFn?: (value: T) => void) {
  const value = setupFn()
  return {
    finally(teardown: () => void) {
      teardownFn?.(value)
      teardown()
    },
  }
}

// Mock helpers

export function createMock<T>(overrides: Partial<T> = {}): T {
  return { ...overrides } as T
}
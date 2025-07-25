import { z } from 'zod'
import { UserIdSchema, EmailSchema } from '../value-objects'

export const UserSchema = z.object({
  id: UserIdSchema,
  email: EmailSchema,
  name: z.string().optional(),
  createdAt: z.date()
})

export type User = z.infer<typeof UserSchema>

export const UserDomain = {
  create: (id: string, email: string, name?: string): User => {
    return UserSchema.parse({
      id,
      email,
      name: name?.trim() || undefined,
      createdAt: new Date()
    })
  },

  fromPersistence: (data: unknown): User => {
    return UserSchema.parse(data)
  },

  updateName: (user: User, name?: string): User => {
    return {
      ...user,
      name: name?.trim() || undefined
    }
  }
}

import { z } from 'zod'
import { UserIdSchema, UserIdDomain } from '../value-objects/UserId'
import { EmailSchema, EmailDomain } from '../value-objects/Email'

export const UserSchema = z.object({
  id: UserIdSchema,
  email: EmailSchema,
  name: z.string().optional(),
  createdAt: z.date()
})

export type User = z.infer<typeof UserSchema>

export const UserDomain = {
  create: (id: string, email: string, name?: string): User => {
    const validId = UserIdDomain.create(id)
    const validEmail = EmailDomain.create(email)

    return {
      id: validId,
      email: validEmail,
      name: name?.trim() || undefined,
      createdAt: new Date()
    }
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

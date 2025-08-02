import { UserIdDomain } from '../value-objects/UserId'
import { EmailDomain } from '../value-objects/Email'
import { UserSchema, User } from 'shared'

export const UserDomain = {
  create: (id: string, email: string, name?: string): User => {
    const validId = UserIdDomain.create(id)
    const validEmail = EmailDomain.create(email)

    return {
      id: validId,
      email: validEmail,
      name: name?.trim() || undefined,
      createdAt: new Date(),
    }
  },

  fromPersistence: (data: unknown): User => {
    return UserSchema.parse(data)
  },

  updateName: (user: User, name?: string): User => {
    return {
      ...user,
      name: name?.trim() || undefined,
    }
  },
}

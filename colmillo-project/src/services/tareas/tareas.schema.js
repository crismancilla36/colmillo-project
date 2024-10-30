// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { userSchema } from '../users/users.schema.js'

// Main data model schema
export const tareaSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String(),
    createdAt: Type.Number(),
    userId: Type.Number(),
    user: Type.Ref(userSchema)
  },
  { $id: 'Tarea', additionalProperties: false }
)
export const tareaValidator = getValidator(tareaSchema, dataValidator)
export const tareaResolver = resolve({
  user: virtual(async (tarea, context) => {
    // Associate the user that sent the tarea
    return context.app.service('users').get(tarea.userId)
  })
})

export const tareaExternalResolver = resolve({})

// Schema for creating new entries
export const tareaDataSchema = Type.Pick(tareaSchema, ['text'], {
  $id: 'TareaData'
})
export const tareaDataValidator = getValidator(tareaDataSchema, dataValidator)
export const tareaDataResolver = resolve({
  
  userId: async (_value, _tarea, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user.id
  },
  createdAt: async () => {
    return Date.now()
  }
})

// Schema for updating existing entries
export const tareaPatchSchema = Type.Partial(tareaSchema, {
  $id: 'TareaPatch'
})
export const tareaPatchValidator = getValidator(tareaPatchSchema, dataValidator)
export const tareaPatchResolver = resolve({})

// Schema for allowed query properties
export const tareaQueryProperties = Type.Pick(tareaSchema, ['id', 'text', 'createdAt', 'userId'])
export const tareaQuerySchema = Type.Intersect(
  [
    querySyntax(tareaQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const tareaQueryValidator = getValidator(tareaQuerySchema, queryValidator)
export const tareaQueryResolver = resolve({
  userId: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }

    return value
  }
})

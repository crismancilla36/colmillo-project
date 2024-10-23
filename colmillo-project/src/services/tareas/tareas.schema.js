// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const tareaSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Tarea', additionalProperties: false }
)
export const tareaValidator = getValidator(tareaSchema, dataValidator)
export const tareaResolver = resolve({})

export const tareaExternalResolver = resolve({})

// Schema for creating new entries
export const tareaDataSchema = Type.Pick(tareaSchema, ['text'], {
  $id: 'TareaData'
})
export const tareaDataValidator = getValidator(tareaDataSchema, dataValidator)
export const tareaDataResolver = resolve({})

// Schema for updating existing entries
export const tareaPatchSchema = Type.Partial(tareaSchema, {
  $id: 'TareaPatch'
})
export const tareaPatchValidator = getValidator(tareaPatchSchema, dataValidator)
export const tareaPatchResolver = resolve({})

// Schema for allowed query properties
export const tareaQueryProperties = Type.Pick(tareaSchema, ['id', 'text'])
export const tareaQuerySchema = Type.Intersect(
  [
    querySyntax(tareaQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const tareaQueryValidator = getValidator(tareaQuerySchema, queryValidator)
export const tareaQueryResolver = resolve({})

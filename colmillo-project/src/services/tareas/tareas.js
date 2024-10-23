// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  tareaDataValidator,
  tareaPatchValidator,
  tareaQueryValidator,
  tareaResolver,
  tareaExternalResolver,
  tareaDataResolver,
  tareaPatchResolver,
  tareaQueryResolver
} from './tareas.schema.js'
import { TareaService, getOptions } from './tareas.class.js'
import { tareaPath, tareaMethods } from './tareas.shared.js'
import { logRuntime } from '../../hooks/log-runtime.js'

export * from './tareas.class.js'
export * from './tareas.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const tarea = (app) => {
  // Register our service on the Feathers application
  app.use(tareaPath, new TareaService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: tareaMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(tareaPath).hooks({
    around: {
      all: [ 
        logRuntime,
        authenticate('jwt'),
        schemaHooks.resolveExternal(tareaExternalResolver),
        schemaHooks.resolveResult(tareaResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(tareaQueryValidator), schemaHooks.resolveQuery(tareaQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(tareaDataValidator), schemaHooks.resolveData(tareaDataResolver)],
      patch: [schemaHooks.validateData(tareaPatchValidator), schemaHooks.resolveData(tareaPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

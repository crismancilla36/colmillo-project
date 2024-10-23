import { tarea } from './tareas/tareas.js'
import { user } from './users/users.js'
export const services = (app) => {
  app.configure(tarea)

  app.configure(user)

  // All services will be registered here
}

export const tareaPath = 'tareas'

export const tareaMethods = ['find', 'get', 'create', 'patch', 'remove']

export const tareaClient = (client) => {
  const connection = client.get('connection')

  client.use(tareaPath, connection.service(tareaPath), {
    methods: tareaMethods
  })
}

export async function up(knex) {
  await knex.schema.createTable('tareas', (table) => {
    table.increments('id')
    table.string('text')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('tareas')
}

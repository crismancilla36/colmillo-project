/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('tareas', (table) => {
      table.increments('id')
      table.string('text')
      table.bigint('createdAt')
      table.bigint('userId').references('id').inTable('users')
    })
  }

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('tareas')
  }

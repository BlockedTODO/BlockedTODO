exports.up = async (knex) => {
    await knex.schema.createTable('tasks', (table) => {
        table.uuid('id').primary().notNullable();
        table.string('host').notNullable();
        table.string('host_id').notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();

        table.index('host_id');
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('tasks');
};

exports.up = async (knex) => {
    await knex.schema.createTable('repository_issues', (table) => {
        table.uuid('repository_id').references('id').inTable('repositories').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        table.uuid('issue_id').references('id').inTable('issues').onDelete('CASCADE').onUpdate('CASCADE').notNullable();

        table.index('repository_id');
        table.index('issue_id');
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('repository_issues');
};

exports.up = async (knex) => {
    await knex.schema.table('repositories', (table) => {
        // Add installation_id column
        table.string('installation_id');
    });
};

exports.down = async (knex) => {
    await knex.schema.table('repositories', (table) => {
        // Remove installation_id column
        table.dropColumn('installation_id');
    });
};

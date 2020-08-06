exports.up = async (knex) => {
    await knex.schema.table('users', (table) => {
        // Add host id column
        table.string('host_id');
        // Add access token and refresh token columns
        table.string('access_token');
        table.string('refresh_token');
    });
};

exports.down = async (knex) => {
    await knex.schema.table('users', (table) => {
        // Remove host id column
        table.dropColumn('host_id');
        // Remove access token and refresh token columns
        table.dropColumn('access_token');
        table.dropColumn('refresh_token');
    });
};


exports.up = (knex) => {
    return knex.schema.createTable('users', (table) => {
        table.string('id').primary();
        table.string('email').notNullable();
        table.string('senha');
        table.boolean('firstAcess');
        table.boolean('firstAcessPassword');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('users');
};

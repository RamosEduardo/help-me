
exports.up = (knex) => {
    return knex.schema.createTable('helpeds', (table) => {
        table.increments();
        
        table.string('helpedPicture').notNullable();
        table.string('documentIdPicture').notNullable();
        table.string('cpfPicture').notNullable();
        
        table.string('people_id').notNullable();
        table.foreign('people_id').references('id').inTable('peoples');

    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('helpeds');
};

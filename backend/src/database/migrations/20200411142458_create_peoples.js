
exports.up = (knex) => {
    return knex.schema.createTable('peoples', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('documentId').notNullable();
        table.string('cpf').notNullable();
        table.string('mobilePhone').notNullable();
        table.string('otherPhone').notNullable();
        table.string('zipCode').notNullable();
        table.string('street').notNullable();
        table.string('numberHouse').notNullable();
        table.string('neighborhood').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        
        table.string('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');

    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('peoples');
};

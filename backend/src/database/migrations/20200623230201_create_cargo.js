
exports.up = function(knex) {
    return knex.schema.createTable('cargo', (table) => {
        table.increments();      
        table.integer('amount').default(1);

        table.foreign('product_id').references('id').inTable('products');
        table.string('product_id').notNullable();

        table.foreign('solicitation_id').references('id').inTable('solicitations');
        table.string('solicitation_id').notNullable();
        

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('cargo'); 
};

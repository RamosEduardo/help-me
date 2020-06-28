
exports.up = function(knex) {
    return knex.schema.createTable('cargo', (table) => {
        table.string('id').primary(); // alterado

        table.integer('amount').default(1);

        table.foreign('product_id').references('id').inTable('products');
        table.string('product_id').notNullable();

        table.foreign('solicitation_id').references('id').inTable('solicitations');
        table.string('solicitation_id').notNullable();
        
        table.timestamps();
        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('cargo'); 
};

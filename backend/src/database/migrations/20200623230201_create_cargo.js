
exports.up = function(knex) {
    return knex.schema.createTable('cargo', (table) => {
        table.increments();      
        table.string('product_id').notNullable();
        table.integer('amount').default(1);       
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('cargo'); 
};

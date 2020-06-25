
exports.up = function(knex) {
    return knex.schema.createTable('products_categories', (table) => {
        table.increments(); 
        table.string('name').notNullable();      
        table.string('description').notNullable();
        table.decimal('max_weight').default(0.0);
        table.decimal('min_weight').default(0.0);
        table.decimal('max_width').default(0.0);
        table.decimal('max_height').default(0.0);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products_categories');
};

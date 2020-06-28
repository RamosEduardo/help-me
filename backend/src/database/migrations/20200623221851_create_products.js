
exports.up = function(knex) {
    return knex.schema.createTable('products', (table) => {
        
        table.increments();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.decimal('weight').notNullable();
        table.decimal('width').notNullable();
        table.decimal('height').notNullable();
        table.decimal('lenght').notNullable(); // nova tabela
        table.string('pictureProduct').notNullable();
        
        table.string('categories_id');
        table.foreign('categories_id').references('id').inTable('product_categories');
          
        table.string('helped_id').notNullable();
        table.foreign('helped_id').references('id').inTable('helpeds');

        table.timestamps();

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products'); 
};

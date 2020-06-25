exports.up = function(knex) {
    return knex.schema.createTable('solicitations', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        table.decimal('status').default(0);

        table.string('cargo_id').notNullable();
        table.foreign('cargo_id').references('id').inTable('cargo');

        
        table.string('adresses_start_id').notNullable();
        table.foreign('adresses_start_id').references('id').inTable('adresses');

        table.string('adresses_end_id').notNullable();
        table.foreign('adresses_end_id').references('id').inTable('adresses');
        
        table.string('helped_id').notNullable();
        table.foreign('helped_id').references('id').inTable('helpeds');

        table.string('helper_id').default(null);
        table.foreign('helper_id').references('id').inTable('helpers');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('solicitations'); 
};


exports.up = function(knex) {
    return knex.schema.createTable('adresses', (table) => {
        table.increments();
        table.string('type').notNullable();
        table.string('zipCode').notNullable();
        table.string('street').notNullable();
        table.string('numberHouse').notNullable();
        table.string('neighborhood').notNullable();
        table.string('complement').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        
        table.string('helped_id').notNullable();
        table.foreign('helped_id').references('id').inTable('helpeds');

        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('adresses');        
};


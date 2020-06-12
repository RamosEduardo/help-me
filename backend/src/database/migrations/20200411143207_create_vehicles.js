
exports.up = (knex) => {
    return knex.schema.createTable('vehicles', (vehicle) => {
        
        vehicle.string('placa').primary();
        
        vehicle.string('marca').notNullable();
        vehicle.string('modelo').notNullable();
        vehicle.string('ano').notNullable();
        vehicle.string('renavam').notNullable();
        vehicle.string('capacidade').notNullable();
        
        vehicle.string('helper_id').notNullable();
        vehicle.foreign('helper_id').references('id').inTable('helpers');

    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('vehicles');
};

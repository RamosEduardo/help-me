const { increment } = require("../connection");

exports.up = function(knex) {
    return knex.schema.createTable('reports', (table)=>{
        table.increments();
        table.string('user_reported_id').notNullable();
        table.string('user_reporter_id').notNullable();
        table.string('title').notNullable();
        table.string('description').notNullable();

        table.timestamps();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('reports');
};


exports.up = function(knex) {
    return knex.schema.createTable('assessments', (table)=>{
        table.increments();
        table.integer('grade', 1).notNullable();
        table.string('user_evaluator_id').notNullable();
        table.string('user_rated_id').notNullable();
        table.string('description').notNullable();
        
        table.string('solicitation_id').notNullable();
        table.foreign('solicitation_id').references('id').inTable('solicitations');

        table.timestamps();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('reports');
};
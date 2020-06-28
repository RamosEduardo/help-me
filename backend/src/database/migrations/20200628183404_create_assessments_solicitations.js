
exports.up = function(knex) {
    return knex.schema.createTable('assessments_solicitations', (table) => {
        table.string('id').primary();

        table.foreign('assessment_id').references('id').inTable('assessments');
        table.string('assessment_id').notNullable();

        table.foreign('solicitation_id').references('id').inTable('solicitations');
        table.string('solicitation_id').notNullable();
        
        table.timestamps();

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('assessments_solicitations');
};

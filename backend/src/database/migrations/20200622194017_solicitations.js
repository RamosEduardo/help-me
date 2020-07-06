exports.up = function(knex) {
    return knex.schema.createTable('solicitations', (table) => {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        table.integer('status').default(0); //migrar para integer
        table.string('withdrawal_time').default(null);
        table.string('delivery_time').default(null);
        table.date('delivery_date');

        table.string('cargo_id').default(null);
        table.foreign('cargo_id').references('id').inTable('cargo');
        
        table.string('adresses_start_id').notNullable();
        table.foreign('adresses_start_id').references('id').inTable('adresses');

        table.string('adresses_end_id').notNullable();
        table.foreign('adresses_end_id').references('id').inTable('adresses');
        
        table.string('helped_id').notNullable();
        table.foreign('helped_id').references('id').inTable('helpeds');

        table.string('helper_id').default(null);
        table.foreign('helper_id').references('id').inTable('helpers');

        table.string('assessments_helper_id').default(null);
        table.foreign('assessments_helper_id').references('id').inTable('assessments_solicitations');

        table.string('assessments_helped_id').default(null);
        table.foreign('assessments_helped_id').references('id').inTable('assessments_solicitations');
       
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('solicitations'); 
};

/* Siginificado dos Status
   0 - Aberto 
   1 - Entregador Aceite
   2 - Entregador Confirmado pelo Solicitante
   3 - Buscar Produto
   4 - Produto Retirado
   5 - Produto Entregue
   6 - Corrida Finalizada
   9 - Corrida Inativada
*/
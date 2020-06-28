
exports.up = (knex) => {
    
    return knex.schema.createTable('helpers', (table) => {
        
        table.increments();
        
        table.boolean('haveDriverLicense').notNullable();
        table.string('DriverLicenseNumber');
        table.string('driverLicensePicture');
        
        table.string('helperPicture').notNullable();
        table.string('documentIdPicture').notNullable();
        table.string('cpfPicture').notNullable();
        table.string('addressDocumentPicture').notNullable();
        table.string('user_id').notNullable();
        table.boolean('status_validate').default(false);  //new 
        
        table.string('people_id').notNullable();
        table.foreign('people_id').references('id').inTable('peoples');

        table.timestamps();

    });
    
};

exports.down = (knex) => {
    return knex.schema.dropTable('helpers');
};

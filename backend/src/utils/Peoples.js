const connection = require('../database/connection');

module.exports = {
  async getPeoplesByUserId({
    userId = {}
  }) {
    console.log('userId ', userId);
    
    const people = await connection('peoples')
    .where('user_id',userId)
    .select('id').first();

    
    
    return people;
  },

  async createPersonHelped({
    helpedPicture = '',
    documentIdPicture = '',
    cpfPicture = '',
    people_id = '',
  }) {
    const newPerson = await connection('helpeds').insert({
      helpedPicture,
      documentIdPicture,
      cpfPicture,
      people_id,
    });
    return newPerson[0];
  },

  async createPersonHelper({
    haveDriverLicense = false,
    DriverLicenseNumber = 0,
    driverLicensePicture = '',
    helperPicture = '',
    documentIdPicture = '',
    cpfPicture = '',
    addressDocumentPicture = '',
    user_id = '',
    people_id = ''
  }) {
    const newPersonHelper = await connection('helpers').insert({
      haveDriverLicense,
      DriverLicenseNumber,
      driverLicensePicture,
      helperPicture,
      documentIdPicture,
      cpfPicture,
      addressDocumentPicture,
      user_id,
      people_id,
    });
    return newPersonHelper[0];
  }
}
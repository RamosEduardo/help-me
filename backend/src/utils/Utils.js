const connection = require('../database/connection');

module.exports = {
  getUserIdByToken(valueToken) { 
    const token = valueToken;
    console.log(token);
    
    if (!token)
      return undefined;
    const [ user ] = token.split('//');

    
    if (!user)
      return undefined;
    return user; 

  },

  
  generateTokenSession({value}) {

    

    return new Buffer(value).toString("base64");
  },
  
  async getHelpedIdByPeopleUser({
    peopleId = {}
  }) {
    console.log('peopleId ', peopleId);
    
    const helpeds = await connection('helpeds')
    .where('people_id',peopleId)
    .select('id').first();

    console.log(helpeds);
       
    return helpeds;
  },

  async getHelperIdByPeopleUser({
    peopleId = {}
  }) {
    console.log('peopleId ', peopleId);
    
    const helpers = await connection('helpers')
    .where('people_id',peopleId)
    .select('id').first();

    console.log('helper função', helpers);
       
    return helpers;
  },

}
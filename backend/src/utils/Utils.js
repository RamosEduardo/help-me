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

  /*
  async getIdPeopleByUser(userId){
    const userId = userId;
    console.log('dentro da função', userId);
    
    if (!userId)
      return undefined;
    
  
    const {id} = await connection('peoples')
    .where('user_id',userId)
    .select('id').first();

    
    console.log('id dentro da função',id);
    return id;
    
  },
  */

  
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

    console.log(helpers);
       
    return helpers;
  },

}
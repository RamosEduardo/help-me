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



  /*
  async getUserIdByToke(req, res{
    req.token
    if (!token)
        return res.status(400).send('Faça o login');
        
    const user = token.split('//');
    const userId = user[0];

    console.log(userId);

    return userId;
  })
  const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');
        const user = token.split('//');
        const userId = user[0];
   
        console.log(userId);
}

*/

}
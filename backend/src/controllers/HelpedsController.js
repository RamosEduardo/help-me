const connection = require('../database/connection');
const image2base64 = require('image-to-base64');
const Peoples = require('../utils/Peoples');

module.exports = {

    async update(req, res) {

        const { 
            name, 
            documentId, 
            cpf, 
            mobilePhone, 
            otherPhone, 
            zipCode, 
            street, 
            numberHouse, 
            neighborhood, 
            city, 
            state
        } = req.body;

        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');
        const user = token.split('//');
        const userId = user[0];
        
        const people = await connection('peoples')
            .where('user_id',userId)
            .update({
                name, 
                documentId, 
                cpf, 
                mobilePhone, 
                otherPhone, 
                zipCode, 
                street, 
                numberHouse, 
                neighborhood, 
                city, 
                state,
                update_at: Date(),
            });
        if (!people)
            return res.status(400).send('Você não tem permissão para alterar esses dados!');
        return res.status(200).json(people);
    },

    async index(req, res) {
        const helpeds = await connection('helpeds').select('*');
        return res.json({ helpeds })
    },

    async create(req, res) {

      const {
        helpedPicture = {},
        documentIdPicture = {},
        cpfPicture = {},
      } = req.body;

        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
          return res.status(400).send('Faça o login');
        const user = token.split('//');
        const userId = user[0];

        Peoples.getPeoplesByUserId({ userId }).then(resp => {
          const { id } = resp;
          
          Peoples.createPersonHelped({
            helpedPicture,
            documentIdPicture,
            cpfPicture,
            people_id: id,
            created_at: Date(),
          }).then(newPerson => {
            if (!newPerson)
              return res.status(404);

            return res.json({ newPerson });
          });
          
        });


    }
}
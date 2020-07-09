const connection = require('../database/connection');
const image2base64 = require('image-to-base64');
const Peoples = require('../utils/Peoples');
const utils = require('../utils/Utils');

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

        const token = utils.getUserIdByToken(token);
        
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
        const helpers = await connection('helpers').select('*');
        return res.json({ helpers })
    },

    async create(req, res) {
        const token = Buffer.from(req.headers.authorization, "base64").toString("ascii");
        if (!token)
          return res.status(400).send('Faça o login');
        const user = token.split('//');
        const userId = user[0]; //substituir

        console.log('Oque vem por aqui', userId );
        
        Peoples.getPeoplesByUserId({ userId }).then(resp => {
          const {id} = resp;

          console.log(id);
          
          Peoples.createPersonHelper({
            user_id: userId,
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
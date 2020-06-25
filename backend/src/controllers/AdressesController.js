const connection = require('../database/connection');
const { index } = require('./HelpedsController');
const { getUserIdByToken, generateTokenSession } = require('../utils/Utils');

module.exports = {
    async create(req, res){
        const {
            type,
            ziCode,
            street,
            numberHouse,
            neighborhood,
            complement,
            city,
            state
        } = req.body;

        const helped_id = req.headers.authorization;

        const address = await connection('adresses').insert({
            type,
            ziCode,
            street,
            numberHouse,
            neighborhood,
            complement,
            city,
            state,
            helped_id    
        });

        return res.status(200).json({ adresse });
    },


    async index(req, res){ 
        
        const helped_id = req.headers.authorization;

        const helpedAdresse = await connection('adresses')
            .where('helped_id', helped_id)
            .select('*');
       
           return res.json({ helpedAdresse });
    },

    async update(req, res){
        
        const { id } = req.params;

        const {
            type,
            ziCode,
            street,
            numberHouse,
            neighborhood,
            complement,
            city,
            state
        } = req.body;

        const helped_id = req.headers.authorization;

        const adresse = await connection('adresses')
            .where  ('helped_id', helped_id)
            .and    ('id', id)
            .update ({
                type,
                ziCode,
                street,
                numberHouse,
                neighborhood,
                complement,
                city,
                state    
            });

        return res.status(200).json({ adresse });
    },


    async detele(req, res){ 
        
        const { id } = req.params;

        const helped_id = req.headers.authorization;

        const adresse = await connection('adresses')
            .where ('helped_id', helped_id)
            .and   ('id', id)
            .delete('*');
       
           return res.status(204).send();
    }

};
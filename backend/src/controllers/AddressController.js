const connection = require('../database/connection');
const { index } = require('./HelpedsController');
const { query } = require('express');
//const { getUserIdByToken, generateTokenSession } = require('../utils/Utils');

module.exports = {
    async create(req, res){

        //const { id } = r.params;
        

        const {
            type,
            zipCode,
            street,
            numberHouse,
            neighborhood,
            complement,
            city,
            state
        } = req.body;

       // const token = req.headers.authorization;
        const helped_id = req.headers.authorization;

       console.log(helped_id);

        //mudar para address
        

        const address = await connection('adresses').insert({
            type,
            zipCode,
            street,
            numberHouse,
            neighborhood,
            complement,
            city,
            state,
            helped_id: helped_id,   
        });

        return res.status(200).json({ address });
    },


    async index(req, res){ 
        
        const helped_id = req.headers.authorization;

        const helpedAdress = await connection('adresses')
            .where('helped_id', helped_id)
            .select('*');
       
           return res.json({ helpedAdress });
    },

    async update(req, res){
        
        const {
            type,
            zipCode,
            street,
            numberHouse,
            neighborhood,
            complement,
            city,
            state
        } = req.body;

        const {id} = req.params;

        const helped_id = req.headers.authorization;
       
        const address = await connection('adresses')
            .where({
                helped_id: helped_id,
                id: id
            })
            .update ({
                type,
                zipCode,
                street,
                numberHouse,
                neighborhood,
                complement,
                city,
                state,
            });

        return res.status(200).json({ address });
    },


    async remove(req, res){ 
        
        const {id} = req.params;

        const helped_id = req.headers.authorization;

        const address = await connection('adresses')
            .where({
                helped_id: helped_id,
                id: id
            })
            .delete('*');
       
           return res.status(200).json({ address });
    }

};
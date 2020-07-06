const connection = require('../database/connection');
const { index } = require('./HelpedsController');
const { query } = require('express');
const image2base64 = require('image-to-base64');
const { getUserIdByToken, generateTokenSession, getIdPeopleByUser, getHelpedIdByPeopleUser } = require('../utils/Utils');
const { getPeoplesByUserId } = require('../utils/Peoples');
const Peoples = require('../utils/Peoples');



module.exports = {


    async create(req, res){


        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');
       
        const userId = getUserIdByToken(token);
        if (!userId)
            return res.status(400).send('Faça o login');

        const people = await getPeoplesByUserId({userId});  
        const helped = await getHelpedIdByPeopleUser({ peopleId: people.id });

        if (!helped)
        return res.status(404).send('Motorista não cadastrado!');

        const helped_id = helped.id;

        

        const {
            type,
            zipCode,
            street,
            numberHouse,
            neighborhood,
            complement,
            city,
            state,
        } = req.body;


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
            created_at: Date()  
        });

        return res.status(200).json({ address });
        
    },


    async index(req, res){ 
        
        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');
       
        const userId = getUserIdByToken(token);
        if (!userId)
            return res.status(400).send('Faça o login');

        const people = await getPeoplesByUserId({userId});  
        const helped = await getHelpedIdByPeopleUser({ peopleId: people.id });

        if (!helped)
        return res.status(404).send('Motorista não cadastrado!');

        const helped_id = helped.id;


        //const helped_id = req.headers.authorization;


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

        
        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');
       
        const userId = getUserIdByToken(token);
        if (!userId)
            return res.status(400).send('Faça o login');

        const people = await getPeoplesByUserId({userId});  
        const helped = await getHelpedIdByPeopleUser({ peopleId: people.id });

        if (!helped)
        return res.status(404).send('Motorista não cadastrado!');

        const helped_id = helped.id;

        //const helped_id = req.headers.authorization;
       
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
                updated_at: Date(),
            });

        return res.status(200).json({ address });
    },


    async remove(req, res){ 
        
        const {id} = req.params;

        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');
       
        const userId = getUserIdByToken(token);
        if (!userId)
            return res.status(400).send('Faça o login');

        const people = await getPeoplesByUserId({userId});  
        const helped = await getHelpedIdByPeopleUser({ peopleId: people.id });

        if (!helped)
        return res.status(404).send('Motorista não cadastrado!');

        const helped_id = helped.id;
        

       // const helped_id = req.headers.authorization;

        const address = await connection('adresses')
            .where({
                helped_id: helped_id,
                id: id
            })
            .delete('*');
       
           return res.status(200).send('Endereço excluido');
    }

};
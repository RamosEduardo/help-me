const connection = require('../database/connection');
const { create, index } = require('./HelpedsController');
const { update } = require('../database/connection');
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
            name, 
            description, 
            weight, 
            width, 
            height,
            lenght,
            pictureProduct, 
            categories_id 
        } = req.body;

      //  const helped_id = req.headers.authorization;

        const product = await connection('products').insert({
            name,
            description,
            weight,
            width,
            height,
            lenght,
            pictureProduct,
            categories_id,
            helped_id,
            created_at: Date(),    
        });

        return res.json({ product });
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

        const product = await connection('products')
        .select('*')
        .where('helped_id', helped_id);
        return res.json({ product });
    },

    async update(req, res){
        
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

        const { 
            name, 
            description, 
            weight, 
            width, 
            height, 
            lenght,
            pictureProduct, 
            categories_id 
        } = req.body;

        const product = await connection('products')
            .where({
                helped_id: helped_id,
                id: id
            })  
            .update({
                name,
                description,
                weight,
                width,
                height,
                lenght,
                pictureProduct,
                categories_id,  //mandar a categoria por string por enquanto
                updated_at: Date(),   
            });

        return res.status(200).json({ product });

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

        //const helped_id = req.headers.authorization;

        const product = await connection('products')
            .where({
                helped_id: helped_id,
                id: id
            })
            .delete('*');
       
           return res.status(200).json({ product });
    }
};






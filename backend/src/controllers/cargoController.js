const connection = require('../database/connection');
const image2base64 = require('image-to-base64');
const { index } = require('./HelpedsController');
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
        return res.status(404).send('Solicitante não cadastrado!');

        const helped_id = helped.id;

        const {solicitation_id} = req.params;

        const checkSolicitation = await connection('solicitations')
            .select('id')
            .where({
                id: solicitation_id,
                helped_id: helped_id
            })
            .first()

        if(!checkSolicitation)
            return res.status(404).send('Solicitação informada não pertence ao solicitante!');


        const{
            amount,
            product_id,
        } = req.body;


        const checkProduct = await connection('products')
        .select('id')
        .where({
            id: product_id,
            helped_id: helped_id
        })
        .first()

        if(!checkProduct)
            return res.status(404).send('Produto não cadastrado!');


        const concat = product_id + "//" + solicitation_id;

        console.log(concat);

        const id = new Buffer(concat, "base64").toString("ascii");

        console.log(id);

        const cargo = await connection('cargo').insert({
            id: id,
            amount,
            product_id,
            solicitation_id,
            created_at: Date(),
        });

        return res.status(200).send('Produto inserido na carga!');

    },

    async index(req, res){

        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');

        
        const {solicitation_id} = req.params;

        const checkSolicitation = await connection('solicitations')
        .select('id')
        .where({
            id: solicitation_id,        
        })
        .first()

        if(!checkSolicitation)
            return res.status(404).send('Solicitação informada não pertence ao solicitante!');

        const cargo = await connection('cargo')
        .join('products', 'products.id', '=', 'product_id')
        
        .select([
            'cargo.*',
            'products.name',
            'products.description',
            'products.weight',
            'products.width',
            'products.height',
            'products.lenght',
            'products.pictureProduct',
        ])
        .where({
            solicitation_id: solicitation_id

        })
        

        return res.json({ cargo });

    },

    async remove(req, res){
        
        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');
       
        const userId = getUserIdByToken(token);
        if (!userId)
            return res.status(400).send('Faça o login');

        const people = await getPeoplesByUserId({userId});  
        const helped = await getHelpedIdByPeopleUser({ peopleId: people.id });

        if (!helped)
        return res.status(404).send('Solicitante não cadastrado!');

        const helped_id = helped.id;

        const {solicitation_id} = req.params;

        const {product_id} = req.params;


        const checkSolicitation = await connection('solicitations')
        .select('id')
        .where({
            id: solicitation_id,
            helped_id: helped_id
        })
        .first()

        console.log(checkSolicitation);
        
        if(!checkSolicitation)
            return res.status(404).send('Solicitação informada não pertence ao solicitante!');


        const checkProduct = await connection('products')
        .select('id')
        .where({
            id: product_id,
            helped_id: helped_id
        })
        .first()
        console.log('checkproduct');
        
        if(!checkProduct)
            return res.status(404).send('Produto não cadastrado!');


        const checkCargo = await connection('cargo')
            .select('*')
            .where({
                solicitation_id: solicitation_id,
                product_id: product_id
            })
            .first()

        console.log(checkCargo);
        
        if(!checkCargo)
            return res.status(404).send('Produto não pertence a carga informada!');



        const cargo = await connection('cargo')
            .where({
                solicitation_id: solicitation_id,
                product_id: product_id

            })
            .delete('*')
        
        return res.status(404).send('Produto excluido da carga!');
    }

    


   
};

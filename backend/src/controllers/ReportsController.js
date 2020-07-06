const connection = require('../database/connection');
const { create, index } = require('./vehiclesController');
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


        const user_reporter_id = userId;

        console.log(user_reporter_id);
        

        const {id} = req.params;

        const checkUser = await connection('users')
            .select('*')
            .where({
                id: id
            })
            .first()
        
        if(!checkUser)
            return res.status(404).send('Usuario reportado não existe!');


        console.log(id);
        

        const{
            title,
            description
        } = req.body;

        const report = await connection('reports').insert({
            user_reported_id: id,
            user_reporter_id,
            title,
            description,
            created_at: Date(),
        });

        return res.json({ report });

    },

    async index(req, res){

        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');
        
        const {id} = req.params;

        const reported = await connection('reports')
            .select('*')
            .where({
                user_reported_id: id
            })
            .first()
        
        if(!reported)
            return res.status(404).send('Usuario nunca foi reportado!');


        

        return res.status(200).send({ reported });
    }


};
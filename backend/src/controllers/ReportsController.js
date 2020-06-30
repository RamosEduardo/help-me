const connection = require('../database/connection');
const { create, index } = require('./vehiclesController');

module.exports = {

    async create(req, res){

        const user_reporter_id = req.headers.authorization;

        console.log(user_reporter_id);
        

        const {id} = req.params;

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

        const report = await connection('reports').select('*');

        return res.json({ report });
    }


};
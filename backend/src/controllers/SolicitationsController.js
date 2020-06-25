const connection = require('../database/connection');
const { index } = require('./HelpedsController');

module.exports = {
    async create(req, res){
        const{ description, value } = req.body;

        const helped_id = req.headers.authorization;

        const [id] = await connection('solicitations').insert({
            description,
            value,
            helped_id,
            
            
        })

        return res.json({ id });
        
    },

    async index(req, res){
        const solicitations = await connection('solicitations').select('*');
        return res.json(solicitations);
    },




};
const connection = require('../database/connection');
const { create } = require('./vehiclesController');


module.exports = {

    async create(req, res){

        const token = new Buffer(req.headers.token, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');

        const user_evaluator_id = req.headers.authorization;

        const{
            user_rated_id,
            solicitation_id
        }  = req.params;

        const{
            grade,
            description
        } = req.body;

        console.log(Date());
        

        const assessment = await connection('assessments').insert({
            grade,
            user_evaluator_id,
            user_rated_id,
            description,
            solicitation_id,
            created_at: Date(),
        });

        return res.json({ assessment });
    },

    async index(req, res){

       // const user_evaluator_id = req.headers.authorization;
       const token = new Buffer(req.headers.token, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');

        const{
            user_rated_id,
        }  = req.params;

        const assessment = await connection('assessments')
            .where({
                user_rated_id,
            })
            .select('*');
        
        return res.json({ assessment });
    }
     

};
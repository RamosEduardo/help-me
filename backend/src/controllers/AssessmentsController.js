const connection = require('../database/connection');
const { create } = require('./vehiclesController');


module.exports = {

    async helpedEvaluator(req, res){

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

        const user_evaluator_id = helped_id;

        const{
            user_rated_id,
            solicitation_id
        }  = req.params;

        const{
            grade,
            description
        } = req.body;

        console.log(Date());

        if(user_evaluator_id === user_rated_id)
            return res.status(404).send('Usuario não pode se auto avaliar!');

        const checkSolicitation = await connection('solicitations')
            .select()
            .where({
                id: solicitation_id,
                helped_id: user_evaluator_id,
                helper_id: user_rated_id
            })    
            .first()
        
        if(!checkSolicitation)
            return res.status(404).send('Informações invalidas!');


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
    },

    async helperEvaluator(req, res){

        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');
       
        const userId = getUserIdByToken(token);
        if (!userId)
            return res.status(400).send('Faça o login');

        const people = await getPeoplesByUserId({userId});  
        const helper = await getHelperIdByPeopleUser({ peopleId: people.id });     

        if (!helper)
            return res.status(404).send('Motorista não cadastrado!');
        
        const helper_id = helper.id;

        const user_evaluator_id = helper_id;

        const{
            user_rated_id,
            solicitation_id
        }  = req.params;

        const{
            grade,
            description
        } = req.body;

        console.log(Date());

        if(user_evaluator_id === user_rated_id)
            return res.status(404).send('Usuario não pode se auto avaliar!');

        const checkSolicitation = await connection('solicitations')
            .select()
            .where({
                id: solicitation_id,
                helped_id: user_rated_id,
                helper_id: user_evaluator_id
            })    
            .first()
        
        if(!checkSolicitation)
            return res.status(404).send('Informações invalidas!');
            

        const assessment = await connection('assessments').insert({
            grade,
            user_evaluator_id,
            user_rated_id,
            description,
            solicitation_id,
            created_at: Date(),
        });

        return res.json({ assessment });
    }
     

};
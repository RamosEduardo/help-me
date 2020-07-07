const connection = require('../database/connection');
const { getUserIdByToken, generateTokenSession, getHelpedIdByPeopleUser, getHelperIdByPeopleUser } = require('../utils/Utils');
const { getPeoplesByUserId } = require('../utils/Peoples');
const Peoples = require('../utils/Peoples');

module.exports = {

    //Entregadorr pega corrida
    async start(req, res){

        const {id} = req.params;       


        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');
       
        const userId = getUserIdByToken(token);
        if (!userId)
            return res.status(400).send('Faça o login');

        const people = await getPeoplesByUserId({userId}); 

        const helper = await getHelperIdByPeopleUser({ peopleId: people.id });     

        if (!helper)
            return res.status(404).send('Entregador não cadastrado!');
        
        const helper_id = helper.id;

        const checkSolicitation = await connection('solicitations')
            .select('*')
            .where({
                id: id,
                helped_id: helper_id,
                status: 2
            })
            .first()
        
            if(checkSolicitation)
                return res.status(404).send('O entregador não pode ser igual ao solicitante! Ou entregador não foi confirmado.');

       // const helper_id = req.headers.authorization;      
       
        const solicitation = await connection('solicitations')
            .where ('id',id)
            .update({ 
                status: 4     
            });
        
        return res.json('Produto Retirado!');
        
    },

    async end(req, res){

        
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
       
        const { id } = req.params;

        const checkSolicitation = await connection('solicitations')
            .select()
            .where ({
                id: id,
                helper_id: helped_id,    
            })
            .first()
        
        if(checkSolicitation)
            return res.status(404).send('Entregador não pode finalizar a corrida!');

        const checkStatus = await connection('solicitations')
            .select()
            .where({
                id: id,
                status: 4
            })
            .first()

        if(!checkStatus)
            return res.status(404).send('Produto ainda não foi retirado! Não pode finalizar corrida.');

        const solicitation = await connection('solicitations')
            .where ({
                id: id,
                helped_id: helped_id,
                status: 4
            })
            .update({
                status: 6      
            })
            
        
        if(!solicitation)
            return res.status(404).send('Solicitação não pertende ao solicitante! Ou não iniciada.');

        return res.status(200).send('Corrida Finalizada!');
    },


};
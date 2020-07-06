const connection = require('../database/connection');
const { getUserIdByToken, generateTokenSession, getHelpedIdByPeopleUser, getHelperIdByPeopleUser } = require('../utils/Utils');
const { getPeoplesByUserId } = require('../utils/Peoples');
const Peoples = require('../utils/Peoples');

module.exports = {

    //Entregadorr pega corrida
    async join(req, res){

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
            return res.status(404).send('Motorista não cadastrado!');
        
        const helper_id = helper.id;

        const checkSolicitation = await connection('solicitations')
            .select('*')
            .where({
                id: id,
                helped_id: helper_id
            })
            .first()
        
            if(checkSolicitation)
                return res.status(404).send('O entregador não pode ser igual ao solicitante!');

       // const helper_id = req.headers.authorization;      
       
        const solicitation = await connection('solicitations')
            .where ('id',id)
            .update({
                helper_id: helper_id, 
                status: 1     
            });
        
        return res.json({ solicitation });
        
    },

    async accept(req, res){

        
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

        const solicitation = await connection('solicitations')
            .where ({
                id: id,
                helped_id: helped_id
            })
            .update({
                status: 2      
            });
        
        if(!solicitation)
            return res.status(404).send('Solicitação não pertende ao solicitante!');

        return res.status(200).send('Entregador aceito!');
    },

    async decline(req, res){

        
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

        const solicitation = await connection('solicitations')
            .where ({
                id: id,
                helped_id: helped_id
            })
            .update({
                helper_id: null,
                status: 0      
            });

        if(!solicitation)
            return res.status(404).send('Solicitação não pertende ao solicitante!'); 

        
        return res.status(404).send('Entregador recusado!');
    }


    

};
const connection = require('../database/connection');
const { getUserIdByToken, generateTokenSession, getHelpedIdByPeopleUser, getHelperIdByPeopleUser } = require('../utils/Utils');
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
        const helper = await getHelperIdByPeopleUser({ peopleId: people.id });     

        if (!helper)
            return res.status(404).send('Motorista não cadastrado!');
        
        const helper_id = helper.id;

        const { 
            placa, 
            marca, 
            modelo, 
            ano, 
            renavam, 
            capacidade  
        } = req.body;

        const checkPlaca = await connection('vehicles')
            .select('placa')
            .where('placa', placa)
            .first()

        console.log('check',checkPlaca);

        if(checkPlaca)
            return res.status(404).send('Placa já cadastrada!');
        

        const vehicle = await connection('vehicles').insert({
            placa, 
            marca, 
            modelo, 
            ano, 
            renavam, 
            capacidade,
            helper_id: helper_id,
            created_at: Date(),  
              
        });

        return res.json({ vehicle });
    },

    async index(req, res){
        
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

        const vehicle = await connection('vehicles')
        .select('*')
        .where('helper_id', helper_id);
        return res.json({ vehicle });
    },

    async update(req, res){

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
        
        const {placa} = req.params;
        console.log(placa);
        

        const checkExistPlaca = await connection('vehicles')
        .select('placa')
        .where('placa', placa)
        .first()

        if (!checkExistPlaca)
            return res.status(404).send('Placa não cadastrada!');

        console.log('check',checkExistPlaca);
        
        //const helper_id = req.headers.authorization;

        const { 
            newPlaca, 
            marca, 
            modelo, 
            ano, 
            renavam, 
            capacidade  
        } = req.body;

        
        const checkPlaca = await connection('vehicles')
        .select('placa')
        .where('placa', newPlaca)
        .first()

        console.log('check',checkPlaca);

        if(checkPlaca)
            return res.status(404).send('Placa já cadastrada!');
        



        const vehicle = await connection('vehicles')
            .where({
                helper_id: helper_id,
                placa: placa
            })  
            .update({
                placa: newPlaca, 
                marca, 
                modelo, 
                ano, 
                renavam, 
                capacidade,
                helper_id,
                updated_at: Date(),     
            });

        return res.status(200).json({ vehicle });

    },

    async remove(req, res){ 
        
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

        const {placa} = req.params;

          
        const checkPlaca = await connection('vehicles')
        .select('placa')
        .where({
            'placa': placa,
            'helper_id': helper_id                      
        })
        .first()
       
        if (!checkPlaca)
            return res.status(404).send('Placa não cadastrada!');
        
        //const helper_id = req.headers.authorization;

        const vehicle = await connection('vehicles')
            .where({
                helper_id: helper_id,
                placa: placa
            })
            .delete('*');
       
        return res.status(200).json({ vehicle });
    }
};





const connection = require('../database/connection');
const { index } = require('./HelpedsController');
const { update } = require('../database/connection');
const { getUserIdByToken, generateTokenSession, getIdPeopleByUser, getHelpedIdByPeopleUser } = require('../utils/Utils');
const { getPeoplesByUserId } = require('../utils/Peoples');
const Peoples = require('../utils/Peoples');

// Para criar o id da corrida vamos ter que importar a utils
// passar de parametro ({ value: ´${now}//${helped_id} ´ })


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
            
        const{ 
            title, 
            description, 
            value, 
            adresses_start_id, 
            adresses_end_id, 
        } = req.body;

        if(adresses_start_id === adresses_end_id)
            return res.status(404).send('Endereço de entrega é igual o endereço de inicio!');


        const solicitationAdressesStart = await connection('adresses')
        .select('*')
        .where({
            id: adresses_start_id,
            helped_id: helped_id
        })
        .first()

        
        console.log('startAddress',solicitationAdressesStart);
        if(!solicitationAdressesStart)
            return res.status(404).send('Endereço de inicio invalido!');    



        const solicitationAdressesEnd = await connection('adresses')
            .select('*')
            .where({
                id: adresses_end_id,
                helped_id: helped_id     
            })
            .first()
        
        console.log('startAddress',solicitationAdressesEnd);
        if(!solicitationAdressesEnd)
            return res.status(404).send('Endereço de entrega invalido!');   




        //const helped_id = req.headers.authorization;
        //const now = new Date();


        const solicitation = await connection('solicitations').insert({
            title, 
            description,
            value,
            helped_id,
            adresses_start_id,
            adresses_end_id,
            created_at: Date(),
        });

        return res.status(200).json('Nova Solicitação criada!');
        
    },

    async index(req, res){

        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');

        const {id} = req.params;

        const solicitation = await connection('solicitations')
            .select()
            .where({
                id: id
            })
            .first()
               

        if(!solicitation)
            return res.status(404).send('Solicitação não encontrada!');

      
            const solicitationCargo = await connection('cargo')
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
                solicitation_id: id
    
            })

        
        const startAddress = solicitation.adresses_start_id;  
        console.log('startAdresse',startAddress);
        
        const solicitationAdressesStart = await connection('adresses')
            .select('*')
            .where({
                id: startAddress
            })
            .first()


        const endAddress = solicitation.adresses_end_id;
        console.log('endAddress',endAddress);
        
        const solicitationAdressesEnd = await connection('adresses')
            .select('*')
            .where({
                id: endAddress     
            })
            .first()

        const helpedId = solicitation.helped_id;
        console.log('helpedid',helpedId);
        
        const solicitationHelped = await connection('helpeds')
            .select('*')
            .where({
                id: helpedId
            })
            .first()

        const helperId = solicitation.helper_id;
        console.log('helper',helperId);
        
        const solicitationHelper = await connection('helpers')
            .select('*')
            .where({
                id: helperId
            })
            .first()
     
        
        return res.status(200).json([
            solicitation,
            solicitationCargo,
            solicitationAdressesStart,
            solicitationAdressesEnd,
            solicitationHelped,
            solicitationHelper
        ]);
          

    },


    async update(req, res){
       
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
       
        const{ 
            title, 
            description, 
            value, 
            adresses_start_id, 
            adresses_end_id, 
            cargo_id
        } = req.body;

        //const helped_id = req.headers.authorization;

        const {id} = req.params;

        console.log('idRecebido',id);


        
        if(adresses_start_id === adresses_end_id)
            return res.status(404).send('Endereço de entrega é igual o endereço de inicio!');


        const solicitationAdressesStart = await connection('adresses')
        .select('*')
        .where({
            id: adresses_start_id,
            helped_id: helped_id
        })
        .first()

        
        console.log('startAddress',solicitationAdressesStart);
        if(!solicitationAdressesStart)
            return res.status(404).send('Endereço de inicio invalido!');    



        const solicitationAdressesEnd = await connection('adresses')
            .select('*')
            .where({
                id: adresses_end_id,
                helped_id: helped_id     
            })
            .first()
        
        console.log('startAddress',solicitationAdressesEnd);
        if(!solicitationAdressesEnd)
            return res.status(404).send('Endereço de entrega invalido!');   

        

        const checkSolicitation = await connection('solicitations')
            .select('id')
            .where({
                id: id,
                helped_id: helped_id
            })
            .first()

        console.log(checkSolicitation);
        
        
        if (!checkSolicitation)
            return res.status(404).send('Solicitação não encontrada!');

        const checkStatus = await connection('solicitations')
        .select('id')
        .where({
            id: id,
            helper_id: null,
            status: 0,
        })
        .first()

        console.log('Check',checkStatus);
        
        if (!checkStatus)
            return res.status(404).send('Solicitação não está em situação Aberta, não pode ser alterada.')
     

        const solicitations = await connection('solicitations')
            .where  ({
                id: id,
                helped_id: helped_id,
                helper_id: null,
                status: 0
            })  
            .update ({
                title, 
                description,
                value,
                helped_id,
                adresses_start_id,
                adresses_end_id,
                cargo_id,
                updated_at: Date(),
            });
        

        return res.status(200).json('Solicitação atualisada');

    },


    async delete (req, res){
       
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

        const {id} = req.params;

        const checkSolicitation = await connection('solicitations')
        .select('id')
        .where({
            id: id,
            helped_id: helped_id
        })
        .first()

   
        if(!checkSolicitation)
            return res.status(404).send('Solicitação não encontrada!');


        const checkStatus = await connection('solicitations')
            .select('id')
            .where({
                id: id,
                helper_id: null,
                status: 0
            })
            .first()

        if(!checkStatus)
            return res.status(404).send('Solicitação não está em situação Aberta, não pode ser excluida.')


        const solicitations = await connection('solicitations')
        .where  ({
            id: id,
            helped_id: helped_id,
            helper_id: null,
            status: 0
        })  
        .delete('*');
        
        return res.status(200).json('Solicitação excluida!');

    },

    async indexAll(req, res){
        
        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');

            
        const solicitation = await connection('solicitations')
            .leftOuterJoin('products', 'products.id', '=', 'solicitations.id')
            .select([
                'solicitations.title',
                'solicitations.value',
                'products.categories_id'
            ])

        return res.status(200).json(solicitation);



        /*
             const solicitationCargo = await connection('cargo')
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
                solicitation_id: id
    
            })
        */


    }

};
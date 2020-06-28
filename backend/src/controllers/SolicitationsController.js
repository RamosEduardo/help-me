const connection = require('../database/connection');
const { index } = require('./HelpedsController');
const { update } = require('../database/connection');

// Para criar o id da corrida vamos ter que importar a utils
// passar de parametro ({ value: ´${now}//${helped_id} ´ })


module.exports = {
    async create(req, res){
        const{ 
            title, 
            description, 
            value, 
            adresses_start_id, 
            adresses_end_id, 
            cargo_id
        } = req.body;

        const helped_id = req.headers.authorization;
        // const now = new Date();
        const [id] = await connection('solicitations').insert({
            title, 
            description,
            value,
            helped_id,
            adresses_start_id,
            adresses_end_id,
            cargo_id
        });

        return res.json({ id });
        
    },

    async index(req, res){
        const solicitations = await connection('solicitations').select('*');
        return res.json(solicitations);
    },


    async update(req, res){
        const{ 
            title, 
            description, 
            value, 
            adresses_start_id, 
            adresses_end_id, 
            cargo_id
        } = req.body;

        const helped_id = req.headers.authorization;

        const {id} = req.params;
     
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
                cargo_id
            });
        

        return res.json(solicitations);

    },


    async delete (req, res){
       
        const helped_id = req.headers.authorization;

        const {id} = req.params;

        const solicitations = await connection('solicitations')
        .where  ({
            id: id,
            helped_id: helped_id,
            helper_id: null,
            status: 0
        })  
        .delete('*');
        
        return res.json(solicitations);

    }

};
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
            cargo_id,
            created_at: Date(),
        });

        return res.json({ id });
        
    },

    async index(req, res){
        const solicitations = await connection('solicitations')
        .select(
            'id',
            'title',
            'description',
            'value',
            'helped_id',
            'adresses_start_id',
            'adresses_end_id',
            'cargo_id',
            'created_at',
        )
        .where()
       



        /*
            ('adresses', 'adresses.id', '=', 'adresses_start_id')
         
        
        .select([
            'solicitations.*',
            //adress start
            'adresses.type              as  adresses_start_type',
            'adresses.zipCode           as  adresses_start_zipCode',
            'adresses.street            as  adresses_start_street',
            'adresses.numberHouse       as  adresses_start_numberHouse',
            'adresses.neighborhood      as  adresses_start_neighborhood',
            'adresses.complement        as  adresses_start_complement',
            'adresses.city              as  adresses_start_city',
            'adresses.state             as  adresses_start_state',
            //adress end
            'adresses.type              as  adresses_end_type',
            'adresses.zipCode           as  adresses_end_zipCode',
            'adresses.street            as  adresses_end_street',
            'adresses.numberHouse       as  adresses_end_numberHouse',
            'adresses.neighborhood      as  adresses_end_neighborhood',
            'adresses.complement        as  adresses_end_complement',
            'adresses.city              as  adresses_end_city',
            'adresses.state             as  adresses_end_state'
            
        ]);

        */

        return res.json({
            ...solicitations,
            cargo: cargo,
            helped: helped,
            adresses: adresses,
        });


{
   
    
}
        


         /*  
         
                SVGAnimatedTransformListsdf
            SVGDefsElementdsf
            defaultStatusdf
            SVGDefsElement
            cargo: {
                sdfsd
            },


        table.string('adresses_start_id').notNullable();
        table.foreign('adresses_start_id').references('id').inTable('adresses');
       
             type,
            zipCode,
            street,
            numberHouse,
            neighborhood,
            complement,
            city,
            state,
            helped_id: helped_id, 
            created_at: Date(),  
        */

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
                cargo_id,
                update_at: Date(),
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
const connection = require('../database/connection');
const { create, index } = require('./HelpedsController');
const { update } = require('../database/connection');

module.exports = {
    async create(req, res){
        
        const { 
            name, 
            description, 
            weight, 
            width, 
            height,
            lenght,
            pictureProduct, 
            categories_id 
        } = req.body;

        const helped_id = req.headers.authorization;

        const product = await connection('products').insert({
            name,
            description,
            weight,
            width,
            height,
            lenght,
            pictureProduct,
            categories_id,
            helped_id,
            created_at: Date(),    
        });

        return res.json({ product });
    },

    async index(req, res){

        
        const helped_id = req.headers.authorization;

        const product = await connection('products')
        .select('*')
        .where('helped_id', helped_id);
        return res.json({ product });
    },

    async update(req, res){
        
        const {id} = req.params;
        
        const helped_id = req.headers.authorization;

        const { 
            name, 
            description, 
            weight, 
            width, 
            height, 
            lenght,
            pictureProduct, 
            categories_id 
        } = req.body;

        const product = await connection('products')
            .where({
                helped_id: helped_id,
                id: id
            })  
            .update({
                name,
                description,
                weight,
                width,
                height,
                lenght,
                pictureProduct,
                categories_id,
                updated_at: Date(),   
            });

        return res.status(200).json({ product });

    },

    async remove(req, res){ 
        
        const {id} = req.params;

        const helped_id = req.headers.authorization;

        const product = await connection('products')
            .where({
                helped_id: helped_id,
                id: id
            })
            .delete('*');
       
           return res.status(200).json({ product });
    }
};






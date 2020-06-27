const connection = require('../database/connection');
const { create, index } = require('./HelpedsController');

module.exports = {

    async create(req, res){
        const{
            name,
            description,
            max_weight,
            min_weight,
            max_width,
            max_height
        } = req.body;

        const categorie = await connection('products_categories').insert({
            name,
            description,
            max_weight,
            min_weight,
            max_width,
            max_height
        });

        return res.json(categorie);
    },

    async index(req, res){
        const categorie = await connection('products_categories').select('*');

        return res.json({ categorie });
    },

    async update(req, res){

        const {id} = req.params;

        const{
            name,
            description,
            max_weight,
            min_weight,
            max_width,
            max_height
        } = req.body;

        const categorie = await connection('products_categories')
            .where({
                id: id
            })
            .update({
                name,
                description,
                max_weight,
                min_weight,
                max_width,
                max_height
            });

        return res.json(categorie);
    },

    async remove(req, res){ 
        
        const {id} = req.params;

        const categories = await connection('products_categories')
            .where({
                id: id
            })
            .delete('*');
       
           return res.status(200).json({ categories });
    }


}; 


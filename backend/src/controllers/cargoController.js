const connection = require('../database/connection');
const image2base64 = require('image-to-base64');
const { index } = require('./HelpedsController');

module.exports = {
    async create(req, res){

        const{
            amount,
            product_id,
            solicitation_id
        } = req.body;

        const concat = product_id + "//" + solicitation_id;

        console.log(concat);

        const id = new Buffer(concat, "base64").toString("ascii");

        console.log(id);

        const cargo = await connection('cargo').insert({
            id: id,
            amount,
            product_id,
            solicitation_id,
            created_at: Date(),
        });

        return res.json({ cargo });

    },

    async index(req, res){

        const cargo = await connection('cargo')
        .join('products', 'products.id', '=', 'product_id')
        
        .select([
            'cargo.*',
            'products.name',
            'products.description',
            'products.weight',
            'products.width',
            'products.height',
            'products.lenght',
            'products.pictureProduct'
        ]);

        return res.json({ cargo });

    }


   
};

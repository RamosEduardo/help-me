const connection = require('../database/connection');


module.exports = {
    async create(req, res){
        
        const { 
            placa, 
            marca, 
            modelo, 
            ano, 
            renavam, 
            capacidade  
        } = req.body;

        const helper_id = req.headers.authorization;

        const vehicle = await connection('vehicles').insert({
            placa, 
            marca, 
            modelo, 
            ano, 
            renavam, 
            capacidade,
            helper_id    
        });

        return res.json({ vehicle });
    },

    async index(req, res){
        
        const helper_id = req.headers.authorization;

        const vehicle = await connection('vehicles')
        .select('*')
        .where('helper_id', helper_id);
        return res.json({ vehicle });
    },

    async update(req, res){
        
        const {placa} = req.query;
        
        const helper_id = req.headers.authorization;

        const { 
            newPlaca, 
            marca, 
            modelo, 
            ano, 
            renavam, 
            capacidade  
        } = req.body;

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
                helper_id     
            });

        return res.status(200).json({ vehicle });

    },

    async remove(req, res){ 
        
        const {placa} = req.query;

        const helper_id = req.headers.authorization;

        const vehicle = await connection('vehicles')
            .where({
                helper_id: helper_id,
                placa: placa
            })
            .delete('*');
       
        return res.status(200).json({ vehicle });
    }
};





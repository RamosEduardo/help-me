const connection = require('../database/connection');

module.exports = {

    //Entregadorr pega corrida
    async update(req, res){

        const { id, status } = req.body;

        const helper_id = req.headers.authorization;
       
        const solicitation = await connection('solicitations')
            .where ('id',id)
            .update({
                helper_id, 
                status      
            });
        
        return res.json({ solicitation });
        
    },

};
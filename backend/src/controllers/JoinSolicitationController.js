const connection = require('../database/connection');

module.exports = {

    //Entregadorr pega corrida
    async join(req, res){

        const {id} = req.params;       

        const helper_id = req.headers.authorization;      
       
        const solicitation = await connection('solicitations')
            .where ('id',id)
            .update({
                helper_id, 
                status: 1     
            });
        
        return res.json({ solicitation });
        
    },

    async accept(req, res){
       
        const { id } = req.params;

        const solicitation = await connection('solicitations')
            .where ('id',id)
            .update({
                status: 2      
            });
        
        return res.json({ solicitation });
    },

    async decline(req, res){
       
        const { id } = req.params;

        const solicitation = await connection('solicitations')
            .where ('id',id)
            .update({
                helper_id: null,
                status: 0      
            });

        return res.json({ solicitation });
    }


    

};
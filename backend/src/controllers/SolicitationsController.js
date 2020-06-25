const connection = require('../database/connection');
const { index } = require('./HelpedsController');

// Para criar o id da corrida vamos ter que importar a utils
// passar de parametro ({ value: ´${now}//${helped_id} ´ })

module.exports = {
    async create(req, res){
        const{ description, value } = req.body;

        const helped_id = req.headers.authorization;
        // const now = new Date();
        const [id] = await connection('solicitations').insert({
            description,
            value,
            helped_id,
            //adicionar hora de recebimento
            
        })

        return res.json({ id });
        
    },

    async index(req, res){
        const solicitations = await connection('solicitations').select('*');
        return res.json(solicitations);
    },




};
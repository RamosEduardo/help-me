const connection = require('../database/connection');
const image2base64 = require('image-to-base64');
module.exports = {

    async update(req, res) {

        const { 
            name, 
            documentId, 
            cpf, 
            mobilePhone, 
            otherPhone, 
            zipCode, 
            street, 
            numberHouse, 
            neighborhood, 
            city, 
            state
        } = req.body;

        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');
        const user = token.split('//');
        const userId = user[0];
        
        // Verificar se já existe usuario com cadastro de pessoa. Se já tiver retornar uma aviso.
         
        const people = await connection('peoples')
            .where('user_id',userId)
            .update({
                name, 
                documentId, 
                cpf, 
                mobilePhone, 
                otherPhone, 
                zipCode, 
                street, 
                numberHouse, 
                neighborhood, 
                city, 
                state,
                update_at: Date(),
            });
        if (!people)
            return res.status(400).send('Você não tem permissão para alterar esses dados!');
        return res.status(200).json(people);
    },

    async index(req, res) {
        const peoples = await connection('peoples').select('*');
        return res.json(peoples)
    },

    async create(req, res) {
        const { 
            name, 
            documentId, 
            cpf, 
            mobilePhone, 
            otherPhone, 
            zipCode, 
            street, 
            numberHouse, 
            neighborhood, 
            city, 
            state
        } = req.body;

        const token = new Buffer(req.headers.authorization, "base64").toString("ascii");
        if (!token)
            return res.status(400).send('Faça o login');
        const user = token.split('//');
        const userId = user[0];
        console.log(userId);
        
        const people = await connection('peoples').insert({
            name, 
            documentId, 
            cpf, 
            mobilePhone, 
            otherPhone, 
            zipCode, 
            street, 
            numberHouse, 
            neighborhood, 
            city, 
            state,
            user_id: userId,
        });

        await connection('users').where('id',userId).update({
            firstAcess: 0,
            firstAcessPassword: 0,
        });

        return res.status(200).json({ people });

    }
}
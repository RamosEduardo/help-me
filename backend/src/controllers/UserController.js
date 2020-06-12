const connection = require('../database/connection');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

module.exports = {

    async index(request, response) {
        const users = await connection('users').select('*');
        return response.json({ users })
    },

    async remove(req, res) {
        await connection('users').delete('*');
    },

    async login(request, response) {
        
        const { email, senha } = request.body;

        const existUserEmail = await connection('users')
        .where({
            'email': email,
        }).select('*').first();
        
        if (existUserEmail) {
            console.log(existUserEmail);
            if (existUserEmail.senha === senha){
                const token = new Buffer(existUserEmail.id + '//' + existUserEmail.senha).toString("base64");
                return response.status(200).json({ token });
            }
            return response.status(404).send('Senha Inválida');
        }
        return response.status(404).send('Usuário Não Encontrado');       

    },

    async rememberPassword(request, response) {
        
        const { email } = request.body;
        
        const user = await connection('users')
            .where('email',email)
            .select('*')
            .first();
        
        if (user) {
            
            user.senha = crypto.randomBytes(4).toString('HEX');
            console.log(user.senha);
            
            await connection('users').where('email',email).update({
                senha: user.senha
            });

            sendEmail.enviar(user.senha, email).then((send) => {
                if (!send) {
                    return response.status(400).send('Falhou');
                } else {
                    return response.status(200).send('Enviou').json(user.senha);
                }
            });
            
        } else {
            return response.status(404).send('Email não encontrado! Cadastre-se');
        }
        

    },

    async create(request, response) {
        const { email } = request.body;
        const user_email = await connection('users')
            .where('email',email)
            .select('*')
            .first();

        if (user_email) {
            return response.status(409).json({ error: 'E-mail já cadastrado!' });
        } else {
            const id = crypto.randomBytes(4).toString('HEX');
            await connection('users').insert({
                id,
                email,
                senha: id,
                firstAcess:true,
                firstAcessPassword: true
            });
    
            return response.json({ id });
        }
    }
}
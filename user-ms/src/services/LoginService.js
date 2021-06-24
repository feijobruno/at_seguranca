import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../schemas/User';
require('dotenv').config();

class LoginService {
    async store(req, res) {
        const { email, password} = req.body;
        const userExiste = await User.findOne({email: email});
        const expiresIn = process.env.EXPIRESIN;
        const secret = process.env.SECRET;

        if(!userExiste){
            return res.status(400).json({
                error: true,
                code: 110,
                message: "Erro: Usuário não encontrado!"
            })
        }

        if(! (await bcrypt.compare(password, userExiste.password))){
            return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Senha inválida!"
            })
        }

        return res.json({
            user: {
                id: userExiste._id,
                name: userExiste.name,
                email
            },
            token: jwt.sign({id: userExiste._id}, secret, {expiresIn: expiresIn}),
        })
    }
}

export default new LoginService();
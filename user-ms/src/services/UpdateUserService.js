import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../schemas/User';

class UpdateUserService {
    async update(req, res) {
        const schema = Yup.object().shape({
            _id: Yup.string()
                .required(),
            name: Yup.string(),
            email: Yup.string()
                .email(),
            password: Yup.string()
                .min(6)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        const { _id, email }= req.body;

        const usuarioExiste = await User.findOne({_id: _id});

        if(!usuarioExiste){
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Usuário não encontrado!"
            });
        };

        if(email != usuarioExiste.email){
            const emailExiste = await User.findOne({email});
            if(emailExiste){
                return res.status(400).json({
                    error: true,
                    code: 110,
                    message: "Erro: Este e-mail já está cadastrado!"
                });
            };
        };

        var dados = req.body;
        if(dados.password){
            dados.password = await bcrypt.hash(dados.password, 8);
        };

        await User.updateOne({_id: dados._id}, dados, (err) => {
            if(err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Usuário não foi editado com sucesso!"
            });

            return res.status(200).json({
                error: false,
                message: "Usuário editado com sucesso!"
            });
        });        
    };
};

export default new UpdateUserService();
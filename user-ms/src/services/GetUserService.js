import User from '../schemas/User';

class GetUsersService {

    async index(req, res) {
        const { page = 1 } = req.query;
        const { limit = 40 } = req.query;
        await User.paginate({}, { select: '_id name email', page, limit }).then((users) => {
            return res.json({
                error: false,
                users: users
            });
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async show(req, res) {
        User.findOne({ _id: req.params.id }, '_id name email createdAt updatedAt originalName fileName').then((user) => {
            return res.status(200).json({
                error: false,
                user: user
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        });
    };
};

export default new GetUsersService();
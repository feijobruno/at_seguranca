import Doctor from '../schemas/Doctor';

class GetDoctorService {
    async index(req, res) {
        const { page = 1 } = req.query;
        const { limit = 40 } = req.query;
        await Doctor.paginate({}, { select: '_id name crm uf speciality', page, limit }).then((doctors) => {
            return res.json({
                error: false,
                doctors: doctors
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
        Doctor.findOne({ _id: req.params.id }, '_id doctor crm uf speciality createdAt updatedAt').then((doctor) => {
            console.log(doctor)
            return res.json({
                error: false,
                doctor: doctor
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

export default new GetDoctorService();
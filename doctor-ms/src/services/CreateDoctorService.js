import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import Doctor from '../schemas/Doctor';

class CreateDoctorService {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            uf: Yup.string().required(),
            crm: Yup.string().required(),
            speciality: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválido!"
            });
        };

        const crmBd = await Doctor.findOne({ crm: req.body.crm });
        if (crmBd) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este CRM já está cadastrado!"
            });
        };

        var dados = req.body;

        const doctor = await Doctor.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Médico não foi cadastrado com sucesso!"
            });

            return res.status(200).json({
                error: false,
                message: "Médico cadastrado com sucesso!",
                dados: doctor
            })
        });
    };
};
export default new CreateDoctorService();
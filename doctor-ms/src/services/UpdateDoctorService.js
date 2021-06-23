import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import Doctor from '../schemas/Doctor';

class UpdateDoctorService {
    async update(req, res) {
        const { _id, crm } = req.body;

        const doctorDb = await Doctor.findOne({ _id: _id });

        if (!doctorDb) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Médico não encontrado!"
            });
        };

        if (crm != doctorDb.crm) {
            const crmDb = await User.findOne({ crm });
            if (crmDb) {
                return res.status(400).json({
                    error: true,
                    code: 110,
                    message: "Erro: Este crm já está cadastrado!"
                });
            };
        };

        var dados = req.body;

        await Doctor.updateOne({ _id: dados._id }, dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Médico não foi editado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Médico editado com sucesso!"
            });
        });
    };
};

export default new UpdateDoctorService();
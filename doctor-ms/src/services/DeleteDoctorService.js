import Doctor from '../schemas/Doctor';

class DeleteUserService {
    async delete(req, res) {
        const doctorDb = await Doctor.findOne({ _id: req.params.id });

        if (!doctorDb) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Médico não encontrado"
            });
        };

        const doctor = await Doctor.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Médico não foi apagado com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Médico apagado com sucesso!"
        });
    };
};
export default new DeleteUserService();
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Doctor = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    crm: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    }  
},
{
    timestamps: true,
});

Doctor.plugin(mongoosePaginate);

export default mongoose.model('doctor', Doctor);
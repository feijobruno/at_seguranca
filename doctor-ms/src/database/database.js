import mongoose from 'mongoose';
require('dotenv').config();

class DataBase {
    constructor() {
        this.mongoDataBase();
    }
    mongoDataBase() {
        const user = process.env.DB_USER;
        const password = process.env.DB_PASSWORD;
        const dbName = process.env.DB_NAME;

        this.mongoConnection = mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.gmulm.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Conexão com MongoDB realizada com sucesso!")
        }).catch((erro) => {
            console.log("Erro: Conexão com MongoDB não foi realizado com sucesso: " + erro)
        })
    }

}

export default new DataBase();

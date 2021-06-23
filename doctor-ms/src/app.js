import express from 'express';
import routes from './routes/DoctorsRoutes';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import './database/database';

require('dotenv').config();

class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.swagger();
        this.routes();
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE'); 
            res.header("Access-Control-Allow-Headers", 'X-PINGOTHER, Content-Type');
            this.app.use(cors());
            next();
        })       

    }

    swagger(){
        const options = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "Library API",
                    version: "1.0.0",
                    description: "A simple Express Library API",
                },
                servers: [
                    {
                        url: `http://localhost:8081`,
                    },
                ],
            },
            apis: ["./src/routes/DoctorsRoutes.js"],
        };
        const specs = swaggerJsDoc(options);
        this.app.use("/doctors/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
      }
     
      routes(){
          this.app.use(routes);
      }
  }

export default new App().app;







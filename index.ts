import express from "express";
import {Request, Response}from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import * as dotenv from "dotenv";
dotenv.config();

import router from "./src/routes";
import cors from "cors";

const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: false}));

var corsOption = {
    origin: ['http://localhost:8080'] , 
    methods: "PUT"
}

application.use(cors(corsOption))

application.get("/", ( req:Request, res:Response) => {
    res.send("Hello World!");
});

application.use(router);

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Technical Test API Doc",
      description: "running in localhost",
      version: "0.0.1"
    },
    servers: [
      {
        url: "http://localhost:9000/",
      },
    ],
  },
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Technical Test API Doc",
      description: "running in localhost",
      version: "0.0.1"
    },
    servers: [
      {
        url: "http://localhost:9000/",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], 
  encoding: 'utf-8',
  failOnErrors: true, 
  verbose: true, 
  format: 'json'
};

const specs = swaggerJsdoc(options);
application.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

const PORT = process.env.PORT || 8000

application.listen(PORT, () => {
    console.log(`server is runing on ${PORT}`);
});
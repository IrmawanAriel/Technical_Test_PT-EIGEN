import express from "express";
import {Request, Response}from "express";

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

application.use(router)

const PORT = process.env.PORT || 8000

application.listen(PORT, () => {
    console.log(`server is runing on ${PORT}`);
});
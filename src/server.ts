import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

async function start() {

    app.listen(process.env.PORT, ()=>{
        console.log(`http://localhost:${process.env.PORT}`);

    });
}

start();
import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

const app = express();

app.use(express.json());

app.use(cors());

dotenv.config();

let db;
const mongoClient = new MongoClient(process.env.DATABASE_URL)
mongoClient.connect()
    .then(() => db = mongoClient.db())
    .catch((error) => console.log(error.message))

const PORT = 5000;

app.listen(PORT,() => console.log(`Servidor rodando na porta ${PORT}`));
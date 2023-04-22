import express from "express";
import cors from "cors";
import { signUp } from "./controllers/auth.controller.js"

const app = express();

app.use(express.json());

app.use(cors());

app.post("/sign-up", signUp);

const PORT = 5000;

app.listen(PORT,() => console.log(`Servidor rodando na porta ${PORT}`));
import express from "express";
import cors from "cors";
import { signUp, signIn, signOut} from "./controllers/auth.controller.js";
import { addOperation, listOperations } from "./controllers/operations.controller.js" 

const app = express();

app.use(express.json());

app.use(cors());

app.post("/sign-up", signUp);

app.post("/sign-in", signIn);

app.post("/new-operation/:type", addOperation);

app.get("/operations", listOperations);

app.delete("/sign-out", signOut)

const PORT = 5000;

app.listen(PORT,() => console.log(`Servidor rodando na porta ${PORT}`));
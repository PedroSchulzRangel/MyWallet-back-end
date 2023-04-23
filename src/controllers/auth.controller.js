import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import {userSignUpSchema, userSignInSchema} from "../schemas/user.schema.js";
import { db } from "../database/database.connection.js";

export async function signUp (req, res) {
    
    const {name, email, password} = req.body;
    
    const validation =  userSignUpSchema.validate(req.body, {abortEarly: false});

    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }
    try{
        const userAlreadyExists = await db.collection("users").findOne({email});
        if (userAlreadyExists) return res.status(409).send("Email já cadastrado!");

        const encryptedPassword = bcrypt.hashSync(password, 10);

        await db.collection("users").insertOne({name, email, password: encryptedPassword});

        res.sendStatus(201);
        
    } catch(error){
        res.status(500).send(error.message);
    }
}

export async function signIn (req, res) {
    
    const {email, password} = req.body;

    const validation =  userSignInSchema.validate(req.body, {abortEarly: false});

    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }
    try{
        const user = await db.collection("users").findOne({email});
        if(!user) return res.status(404).send("Usuário não encontrado");
        if(!bcrypt.compareSync(password,user.password)) return res.status(401).send("senha inválida");
        
        const token = uuid();

        await db.collection("sessions").insertOne({userId: user._id, token});

        res.status(200).send(token);

    } catch(error){
        res.status(500).send(error.message);
    }

}
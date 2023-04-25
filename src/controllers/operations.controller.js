import { operationSchema, typeSchema } from "../schemas/operations.schema.js"
import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export async function addOperation(req, res){
    
    const { value, description } = req.body;
    const {type} = req.params;
    const {authorization} = req.headers;

    const token = authorization?.replace("Bearer ","");

    if(!token) return res.sendStatus(401);

    const validationOp = operationSchema.validate(req.body, {abortEarly: false});
    const validationType = typeSchema.validate(req.params,{abortEarly: false});

    if(validationOp.error){
        const opErrors = validationOp.error.details.map((detail) => detail.message);
        return res.status(422).send(opErrors);
    }
    if(validationType.error){
        const typeErrors = validationType.error.details.map((detail) => detail.message);
        return res.status(422).send(typeErrors);
    }

    try{
    
    const session = await db.collection("sessions").findOne({token});
    if(!session) return res.sendStatus(401);
    
    const user = await db.collection("users").findOne({_id: session.userId})
    if(user){
        await db.collection("operations").insertOne({userId: session.userId,value, description, type, date: dayjs().format('DD/MM')});
        res.sendStatus(201);
    } else {
        res.sendStatus(401);
    }
    } catch(error){
        res.status(500).send(error.message);
    }
}

export async function listOperations(req, res){
    
    const {authorization} = req.headers;

    const token = authorization?.replace("Bearer ","");

    if(!token) return res.sendStatus(401);

    try{
    
        const session = await db.collection("sessions").findOne({token});
        if(!session) return res.sendStatus(401);
        
        const user = await db.collection("users").findOne({_id: session.userId});

        if(user){

            const operationsList = await db.collection("operations").find({userId: session.userId}).toArray();

            res.send({list: operationsList, name: user.name});

        } else {
            res.sendStatus(401);
        }
        } catch(error){
            res.status(500).send(error.message);
        }

}
import cors from "cors"
import express from "express"
import connection from './database.js'
import Joi from "joi"

const app = express()
app.use(cors())
app.use(express.json());


let userRegistrationInfo = null

const tagIdSchema = Joi.object({
    tagId: Joi.string().required()
});

const userInfoSchema = Joi.object({
    name: Joi.string().required(),
    vehicleModel: Joi.string().required(),
    vehicleType: Joi.number().min(1).max(2).required(),
    vehicleColor: Joi.string().regex(/^#[A-Fa-f0-9]{6}$/).max(7).min(7).required(),
    vehicleLicensePlate: Joi.string().min(7).max(7).required(),
});

const testUser = {
    name:"RODRIGO",
    vehicleModel: "gol",
    vehicleType: 2,
    vehicleColor: "#aaaaaa",
    vehicleLicensePlate: "BAD1123",
}

console.log(userInfoSchema.validate(testUser))
//console.log(tagIdSchema.validate({tagId:"asd"}).error.details[0].message)

app.post("/entry", async (req, res) => {
    try{
        const {tagId} = req.body
        // verificar tag
        // verificar se o último dado no banco foi saída
        // verificar se tem créditos
        // adicionar no banco a entrada
    }catch(e){
        console.log(e)
    }
})

app.post("/exit", async (req, res) => {
    try{
        // verificar tag
        // verificar se o último dado no banco foi saída
        // fazer a dedução dos créditos
        // adicionar no banco nova saída
    }catch(e){
        console.log(e)
    }
})

app.post("/register/id", async (req, res) => {
    try{
        const currentUserInfo = userRegistrationInfo;
        if(!currentUserInfo) return res.status(405).send("Faça o registro do participante primeiro!");
        
        const bodyValidation = tagIdSchema.validate(req.body);
        if(bodyValidation.error) return res.status(422).send(bodyValidation.error.details[0].message);

        const {tagId}=req.body;
        const tagAlreadyRegistered = await connection.query(`
            SELECT * FROM test
            WHERE 'tagId' = $1
        `,[tagId]);
        console.log(tagAlreadyRegistered.rows)
        
        return res.send("ok")
    }catch(e){
        console.log(e)
    }
})

app.post("/register/info", async (req, res) => {
    const bodyValidation = userInfoSchema.validate(req.body);
    if(bodyValidation.error) return res.status(422).send(bodyValidation.error.details[0].message);

    userRegistrationInfo = req.body;
    setTimeout(()=>{
        userRegistrationInfo = null;
    },15000)
    res.status(200).send("Passe o cartão nos próximos 15 segundos")
})



//testes
app.get("/health", async (req, res) => {
    res.send("ok");
})

app.get("/test", async (req, res) => {
    try{
        const query = await connection.query('SELECT * FROM test');
        res.send(query.rows);
    }catch(e){
        console.log(e)
    }
})

app.post("/test", async (req, res) => {
    const {name,age} = req.body
    try{
        await connection.query('INSERT INTO test (name,age) VALUES ($1,$2)',[name,age]);
        res.sendStatus(201);
    }catch(e){
        console.log(e)
    }
})

export default app
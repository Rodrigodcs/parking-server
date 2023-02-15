import connection from '../database.js';

let userRegistrationInfo = null;
let credit = null;
let option = "register";
let clientInfo = null;
let timeout = null;

//RECEIVES TAG FROM ESP32 AND SAVES INFO INTO DATABASE
export async function optionSelector(req, res) {
    console.log("chegou controller");
    const tagId=req.body;
    try{
        if(option === "register"){
            console.log("chegou registro");
            const currentUserInfo = userRegistrationInfo;
            if(!currentUserInfo) return res.status(405).send("Faça o registro do cliente primeiro!");

            const tagAlreadyRegistered = await connection.query(`
                SELECT * FROM clients
                WHERE "tagId" = $1
            `,[tagId]);
            
            if(tagAlreadyRegistered.rows.length){
                return res.status(409).send("Tag já cadastrada");
            }
            const {name,vehicleModel,vehicleType,vehicleColor,vehicleLicensePlate} = currentUserInfo;
            
            await connection.query(`
                INSERT INTO clients 
                (name, "tagId", funds, debt, "vehicleModel", "vehicleType", "vehicleColor", "vehicleLicensePlate")
                VALUES ($1,$2,3,0,$3,$4,$5,$6)
            `,[name,tagId,vehicleModel,vehicleType,vehicleColor,vehicleLicensePlate]);
            console.log("registrou");
            
            userRegistrationInfo = null;
            option = null;
            clearTimeout(timeout);

            return res.status(201).send("Nova tag cadastrada");
        }
        if(option === "credit"){
            console.log("chegou crédito");
            const userCredit = credit;
            console.log(userCredit);
            if(!userCredit) return res.status(405).send("Adicione os créditos pelo cliente primeiro!");
            const userExists = await connection.query(`
                SELECT * FROM clients
                WHERE "tagId" = $1
            `,[tagId]);
            if(!userExists.rows.length){
                return res.status(409).send("Cliente não cadastrado");
            }
            await connection.query(`
                UPDATE clients
                SET funds = funds - debt + $1,
                    debt = 0
                WHERE "tagId" = $2
            `,[userCredit,tagId]);

            credit = null;
            option = null;
            clearTimeout(timeout);

            return res.status(202).send("Creditos atualizados");
        }
        if(option === "info"){
            console.log("chegou info");
            const user = await connection.query(`
                SELECT * FROM clients
                WHERE "tagId" = $1
            `,[tagId]);
            console.log("2")
            if(!user.rows.length){
                return res.status(409).send("Cliente não cadastrado");
            }
            console.log("1")
            option = null
            clearTimeout(timeout);

            clientInfo = user.rows[0]
            return res.status(200).send(user.rows[0]);
        }
        return res.status(201).send("Faça o pedido pelo cliente");
    }catch(e){
        console.log(e)
        return res.status(500).send(e);
    }
}

//RECEIVE REGISTRATION INFO FROM CLIENT
export async function register(req, res) {
    userRegistrationInfo = req.body;
    option = "register";

    timeout = setTimeout(()=>{
        userRegistrationInfo = null;
        option = null;
    },15000);
    return res.status(200).send("Passe o cartão nos próximos 15 segundos");
}

//RECEIVE CREDITS INFO FROM CLIENT
export async function addCredit(req,res) {
    credit = req.body.valor;
    option = "credit";

    timeout = setTimeout(()=>{
        credit = null;
        option = null;
    },15000);
    return res.status(200).send("Passe o cartão nos próximos 15 segundos"); 
}

export async function getClientInfo(req,res) {
    option = "info";
    console.log("teste")

    timeout = setTimeout(()=>{
        option = null;
    },15000);
    return res.status(200).send("Passe o cartão nos próximos 15 segundos");    
}

export async function waitingClientInfo(req,res) {
    const thisClient = clientInfo;
    clientInfo = null
    console.log(thisClient)
    if(!thisClient) return res.sendStatus(204);
    return res.status(200).send(thisClient);    
} 

export default {optionSelector,register,addCredit};
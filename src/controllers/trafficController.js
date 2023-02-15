import connection from '../database.js';

export async function checkIn(req, res) {
    const tagId = req.body;
    console.log(tagId)
    try{
        const chackInTime = new Date();
        const userExists = await connection.query(`
            SELECT * FROM clients
            WHERE "tagId" = $1
        `,[tagId]);
        if(!userExists.rows.length) return res.status(409).send("Cliente não cadastrado");

        const {id} = userExists.rows[0];
        if(userExists.rows[0].debt > 0) return res.status(401).send("Cliente em débito");

        const alreadyIn = await connection.query(`
            SELECT * FROM parked
            WHERE "userId" = $1
        `,[id]);
        if(alreadyIn.rows.length) return res.status(401).send("É preciso fazer checkout");
        
        await connection.query(`INSERT INTO traffic ("userId", time, checks) VALUES ($1,$2,$3)`,[id, chackInTime, "in"]);
        await connection.query(`INSERT INTO parked ("userId") VALUES ($1)`,[id]);
        return res.sendStatus(201);
    }catch(e){
        console.log(e);
    }
}

export async function checkOut(req, res) {
    const tagId = req.body;
    console.log(tagId)
    try{
        const checkOutTime = new Date();

        const userExists = await connection.query(`
            SELECT * FROM clients
            WHERE "tagId" = $1
        `,[tagId]);
        if(!userExists.rows.length) return res.status(409).send("Cliente não cadastrado");
        
        const {id,funds} = userExists.rows[0];
        const currentlyParked = await connection.query(`
            SELECT * FROM parked
            WHERE "userId" = $1
        `,[id]);
            
        if(!currentlyParked.rows.length) return res.status(401).send("É preciso fazer check in");

        const lastCheckIn = await connection.query(`
            SELECT * FROM traffic
            WHERE "userId" = $1
            ORDER BY traffic DESC
            LIMIT 1
        `,[id]); 
        if(lastCheckIn.rows[0].checks === "out") return res.sendStatus(403);
        
        const checkInTime = lastCheckIn.rows[0].time;
        
        const minutesUsed = Math.ceil(((checkOutTime-checkInTime)/1000)/60);

        const config = await connection.query(`SELECT config.value from config`);
        const {value} = config.rows[0];

        const payment = minutesUsed*value;

        if(funds-payment<0){
            await connection.query(`UPDATE clients SET debt = $1-funds ,funds = 0 WHERE id = $2`,[payment,id]);
        }else{
            await connection.query(`UPDATE clients SET funds = funds - $1 WHERE id = $2`,[payment,id]);
        }

        await connection.query(`INSERT INTO traffic ("userId", time, checks) VALUES ($1,$2,$3)`,[id, checkOutTime, "out"]);
        await connection.query(`DELETE FROM parked WHERE "userId"=$1`,[id]);
        
        res.sendStatus(201);
    }catch(e){
        console.log(e);
    }
}

export async function getParked(req, res) {
    try{
        const parked = await connection.query(`
            SELECT clients."vehicleModel" as car, clients."vehicleColor" as color, clients."vehicleLicensePlate" as "licensePlate" 
            FROM parked 
            JOIN clients 
            ON clients.id = parked."userId"
        `);
        const config = await connection.query(`SELECT config."maxCars" from config`);
        const {maxCars} = config.rows[0];
        console.log(maxCars);

        const data = {
            maxOccupancy: maxCars,
            clients: parked.rows
        };
        res.status(200).send(data);
    }catch(e){
        console.log(e);
    }
}

export default {checkIn,checkOut};
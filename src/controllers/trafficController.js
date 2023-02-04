import connection from '../database.js'

export async function checkIn(req, res) {
    const {tagId} = req.body
    try{
        const userExists = await connection.query(`
            SELECT * FROM clients
            WHERE "tagId" = $1
        `,[tagId]);
        if(!userExists.rows.length) return res.status(409).send("Cliente não cadastrado");
        console.log(userExists.rows)
        if(userExists.rows[0].debt < 0) return res.status(401).send("Cliente em débito");
        const lastCheck = await connection.query(`
            SELECT * FROM traffic
            WHERE "userId" = $1
        `,[userExists.rows[0].id]);
        if(lastCheck.rows.length && lastCheck.rows[lastCheck.rows.length -1].checks==="in") return res.status(401).send("É preciso fazer checkout")
        await connection.query(`INSERT INTO traffic ("userId", time, checks) VALUES ($1,$2,$3)`,[userExists.rows[0].id, new Date(), "in"]);
        return res.sendStatus(201);
    }catch(e){
        console.log(e)
    }
}

export async function checkOut(req, res) {
    const {tagId} = req.body
    try{
        // const userExists = await connection.query(`
        //     SELECT * FROM clients
        //     WHERE "tagId" = $1
        // `,[tagId]);
        // if(!userExists.rows.length){
        //     return res.status(409).send("Cliente não cadastrado");
        // }
        // await connection.query(`INSERT INTO test (name, "aGe") VALUES ($1,$2)`,[name,age]);
        res.sendStatus(201);
    }catch(e){
        console.log(e)
    }
}

export default {checkIn,checkOut};
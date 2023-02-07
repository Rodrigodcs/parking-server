import connection from '../database.js';

export async function health(req, res) {
    res.send("ok");
}

export async function getTest(req, res) {
    try{
        const query = await connection.query('SELECT * FROM test');
        res.send(query.rows);
    }catch(e){
        console.log(e);
    }
}

export async function postTest(req, res) {
    const {name,age} = req.body;
    try{
        await connection.query(`INSERT INTO test (name, "aGe") VALUES ($1,$2)`,[name,age]);
        res.sendStatus(201);
    }catch(e){
        console.log("test",e);
    }
}

export default {health,getTest,postTest};
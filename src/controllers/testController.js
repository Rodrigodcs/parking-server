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

export async function postEsp(req, res) {
    try{
        if(req.body.bod){
            await connection.query(`INSERT INTO esp (bod) VALUES ($1)`,[req.body.bod]);
            return res.status(201).send("Foi body");
        }
        if(req.headers.hed){
            await connection.query(`INSERT INTO esp (hed) VALUES ($1)`,[req.headers.hed]);
            return res.status(201).send("Foi header");
        }
        res.sendStatus(409);
    }catch(e){
        console.log("test",e);
    }
}



export default {health,getTest,postTest,postEsp};
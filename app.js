import cors from "cors"
import express from "express"
import connection from './database.js'

const app = express()
app.use(cors())
app.use(express.json());

app.get("/test", async (req, res) => {
    try{
        const query = await connection.query('SELECT * FROM test');
        console.log(query.rows);
        res.send(query.rows);
    }catch(e){
        console.log(e)
    }
})

app.get("/test2", (req, res) => {
    const pessoas = [{nome: "João", idade: 30},{nome: "Maria", idade: 20}];
    res.send(pessoas);
})

export default app
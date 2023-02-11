import connection from '../database.js';

export async function login(req, res) {
    const {admin, password} = req.body;
    try{
        const adminExists = await connection.query(`
            SELECT * FROM admins
            WHERE name = $1
        `,[admin]);
        console.log(adminExists)
        if(!adminExists.rows.length) return res.status(401).send("Admin não cadastrado ou senha incorreta");
        if(adminExists.rows[0].password !== password) return res.status(401).send("Admin não cadastrado ou senha incorreta");
        
        return res.sendStatus(200);
    }catch(e){
        console.log(e);
    }
}

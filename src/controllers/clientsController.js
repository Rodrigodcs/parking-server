import connection from '../database.js'

export async function register(req, res) {
    try{
        const currentUserInfo = userRegistrationInfo;
        if(!currentUserInfo) return res.status(405).send("Faça o registro do participante primeiro!");
        
        const bodyValidation = tagIdSchema.validate(req.body);
        if(bodyValidation.error) return res.status(422).send(bodyValidation.error.details[0].message);

        const {tagId}=req.body;
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
            VALUES ($1,$2,0,0,$3,$4,$5,$6)
        `,[name,tagId,vehicleModel,vehicleType,vehicleColor,vehicleLicensePlate]);

        return res.status(201).send("Nova tag cadastrada");
    }catch(e){
        return res.status(500).send(e);
    }
}
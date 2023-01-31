import app from "./app.js"
import * as dotenv from 'dotenv'
dotenv.config()

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server running on port "+process.env.PORT) 
})
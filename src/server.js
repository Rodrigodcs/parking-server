import app from "./app.js";
import * as dotenv from 'dotenv';
dotenv.config();

// // Opções de datas recebidas
// const dataCorretaFuturo = "2023-02-28 01:00"
// const dataCorretaPassado = "2022-02-28 01:00"
// const dataIncorreta = "2022-02-2801:00"

// // Passando as datas para formato Date
// const dataCorretaFuturoFormatoDate = new Date(dataCorretaFuturo)
// const dataCorretaPassadoFormatoDate = new Date(dataCorretaPassado)
// const dataIncorretaFormatoDate = new Date(dataIncorreta)
// const dataAtual = new Date()

// // Para verificar se é uma data inválida
// console.log(dataCorretaFuturoFormatoDate == "Invalid Date") // false
// console.log(dataCorretaPassadoFormatoDate == "Invalid Date") // false
// console.log(dataIncorretaFormatoDate == "Invalid Date") // true

// // Para verificar se é uma data no passado
// console.log(dataCorretaFuturoFormatoDate > dataAtual) // true
// console.log(dataCorretaPassadoFormatoDate > dataAtual) // false
// console.log("Data atual: ",dataAtual.toLocaleDateString())
// dataAtual.setDate(dataAtual.getDate()+30)
// console.log("Data atual + 30 dias: ",dataAtual.toLocaleDateString())



app.listen(process.env.PORT || 8080, ()=>{
    console.log("Server running on port "+process.env.PORT) 
})
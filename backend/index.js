import express, { response } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from './routes/booksRoutes.js'



const app=express();

app.use(express.json());
// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:["GET","POST","PUT","DELETE"],
//     allowedHeaders:['Contend-Type'],
// }));

app.get('/',(request,response)=>{
    return response.status(234).send("Welcome to Mern stack");
});
app.use('/books',booksRoutes);


    

mongoose
    .connect(mongoDBURL)
    .then(() =>{
        console.log("App is connected to database");
        app.listen(PORT,()=>{
            console.log(`App is listening at port ${PORT}`);
    });

    })
    .catch((error)=>{
        console.log(error);
    });
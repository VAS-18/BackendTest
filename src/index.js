import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
import connectDB from "./db/index.js";
const app = express();

dotenv.config({
    path: "./env"
})


connectDB();










// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//     app.on("Error",(error)=>{
//         console.log("Unable to connect to the database", error);
//         throw error
//     })
//     app.listen(process.env.PORT, ()=>{
//         console.log(`Server Running on Port ${PORT}`);
//     })
//   } catch (error) {
//     console.error("Error", error);
//     throw err;
//   }
// })();

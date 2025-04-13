import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
dotenv.config();
const ConnectDB =async()=>{
    try {
       const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
       console.log(`MONGO DB connection successfull and host is ${connectionInstance.connection.host}`);
        
    } catch (error) {

       console.error(`MONGO DB connection failed ${error}`);
    }
}

export {ConnectDB};
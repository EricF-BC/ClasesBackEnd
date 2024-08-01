import mongoose from "mongoose";
import 'dotenv/config'
import config from "../../../config.js";

const MONGO_URL = config.MONGO_URL

export const initMongoDB = async () => {
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB")
    } catch(err){
        console.log(err);
    }

};


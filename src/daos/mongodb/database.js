import mongoose from "mongoose";
import 'dotenv/config'

const MONGO_URL = process.env.MONGO_URL

export const initMongoDB = async () => {
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB")
    } catch(err){
        console.log(err);
    }

};


import dotenv from "dotenv";
import 'dotenv/config'

export default {
    MONGO_URL: process.env.MONGO_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT: process.env.CLIENT,
    SECRET_KEY: process.env.SECRET_KEY,
    CALLBACK_URL: process.env.CALLBACK_URL,
    CLIENT_ID_GOOGLE: process.env.CLIENT_ID_GOOGLE,
    CLIENT_SECRET_GOOGLE: process.env.CLIENT_SECRET_GOOGLE,
    CALLBACK_URL_GOOGLE: process.env.CALLBACK_URL_GOOGLE,
    PORT: process.env.PORT,
    USER_ADMIN: process.env.USER_ADMIN,
    PASSWORD_ADMIN: process.env.PASSWORD_ADMIN
}
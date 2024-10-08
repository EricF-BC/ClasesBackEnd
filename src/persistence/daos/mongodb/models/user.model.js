import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
        //required: true
    },  
    email: {
        type: String,
        required: true,
        unique: true 
    },
    age: {
        type: Number,
        //required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    isGithub: {
        type: Boolean,
        default: false
    },
    isGoogle: {
        type: Boolean,
        default: false
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'cart', 
        default: []
    },
    last_connection: {
        type: Date
    }


});

export const UserModel = model('users', UserSchema);


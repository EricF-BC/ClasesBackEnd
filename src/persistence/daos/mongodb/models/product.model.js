import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const ProductSchema = new Schema({
    title: {type: String, required: true},
    description:{type: String, required: true},
    price:{type: Number, required: true},
    stock:{type: Number, required: true},
    owner: {
        type: String,
        ref: 'users',
        default: "admin"
    }
});


ProductSchema.plugin(mongoosePaginate)

export const ProductModel = model(
    "products",
    ProductSchema
);
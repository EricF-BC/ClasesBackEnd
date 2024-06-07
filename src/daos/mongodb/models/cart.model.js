import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    products: [{
        _id: false,
        quantity: { type: Number, default: 1, required: false},
        product: { type: Schema.Types.ObjectId, ref: "products", required: false}

    }]
});


export const CartModel = model(
    "cart",
    CartSchema
);
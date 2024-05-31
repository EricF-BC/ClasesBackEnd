import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    products: [{
        productID: { type: Schema.Types.ObjectId, ref: "Product", required: false},
        quantity: { type: Number, required: false}
    }]
});


export const CartModel = model(
    "cart",
    CartSchema
);
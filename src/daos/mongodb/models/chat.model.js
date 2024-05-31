import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    user: {type: String,required: true},
    message: {type: String,required: true,}
  },
  { collection: "messages" }
);

export const MessageModel = model(
    "Message", messageSchema
);
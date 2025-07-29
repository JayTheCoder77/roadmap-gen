import mongoose, { Document, Schema } from "mongoose";

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  prompt: string;
  response: string;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new Schema<IChat>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model<IChat>("Chat", chatSchema);

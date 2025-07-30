import mongoose, { Document, Schema } from "mongoose";

export interface IMessage {
  role: "user" | "model";
  text: string;
}

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  title?: string;
  history: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    role: {
      type: String,
      enum: ["user", "model"],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const chatSchema = new Schema<IChat>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
    },
    history: [messageSchema],
  },
  { timestamps: true }
);

export const Chat = mongoose.model<IChat>("Chat", chatSchema);

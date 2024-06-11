import mongoose from "mongoose";

const privateMessageSchema = mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sentDate: { type: Date, default: Date.now },
});

export default mongoose.model("PrivateMessage", privateMessageSchema);

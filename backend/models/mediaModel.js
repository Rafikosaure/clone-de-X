import mongoose from "mongoose";
import { MEDIA_TYPES } from "../utils/constants/models.js";

const mediaSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: { values: MEDIA_TYPES, message: "{VALUE} is not supported" },
  },
  link: { type: String, required: true },
  tweet: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //   list: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
});

export default mongoose.model("Media", mediaSchema);

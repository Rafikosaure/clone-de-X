import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
  tweet: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet", require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
});

export default mongoose.model("Like", likeSchema);

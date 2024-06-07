import mongoose from "mongoose";

const tweetSchema = mongoose.Schema({
  content: { type: String, required: true },
  publicationDate: { type: Date, default: Date.now },
  response: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }],
//   media: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Tweet", tweetSchema);

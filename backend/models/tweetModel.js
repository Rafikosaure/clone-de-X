import mongoose from "mongoose";

const tweetSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxLength: [280, "Content can't exceed 280 characters"],
  },
  publicationDate: { type: Date, default: Date.now },
  responses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }],
  medias: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  parentTweet: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
  originTweet: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
});

export default mongoose.model("Tweet", tweetSchema);

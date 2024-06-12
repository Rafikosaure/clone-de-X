import Like from "../models/likeModel.js";
import User from "../models/userModel.js";
import Tweet from "../models/tweetModel.js";

const create = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const tweet = await Tweet.findById(id);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    const likeUser = await Like.findOne({ user: userId, tweet: id });
    if (likeUser) {
      return res
        .status(400)
        .json({ message: "User has already liked this tweet" });
    }

    const like = await Like.create({ user: userId, tweet: id });

    // Add Like in Tweet
    await pushLikeInTweet(like._id, id);

    res.status(201).json({ message: "Like has been created.", like });
  } catch (error) {
    res.status(500).json({ error: "Error in creating like" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const like = await Like.findOne({ user: userId, tweet: id });

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    // Delete medias of Tweet
    await pullLikeInTweet(like._id, id);

    await Like.findByIdAndDelete(like._id);
    res.status(200).json({ message: "Like has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting like" });
  }
};

// Add Like reference in Tweet
const pushLikeInTweet = async (likeId, tweetId) => {
  await Tweet.findByIdAndUpdate(
    tweetId,
    { $push: { likes: likeId } },
    { new: true }
  );
};

// Remove Like reference in Tweet
const pullLikeInTweet = async (likeId, tweetId) => {
  await Tweet.findByIdAndUpdate(
    tweetId,
    { $pull: { likes: likeId } },
    { new: true }
  );
};

export default {
  create,
  deleteById,
};

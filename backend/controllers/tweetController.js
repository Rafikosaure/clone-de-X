import Tweet from "../models/tweetModel.js";
import User from "../models/userModel.js";
import Media from "../models/mediaModel.js";
import { MEDIA_TYPES } from "../utils/constants/models.js";

const getAll = async (req, res) => {
  try {
    const tweets = await Tweet.find().populate("medias", "-__v -tweet");
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching tweet" });
  }
};

const getAllByIdUser = async (req, res) => {
  try {
    const { idUser } = req.params;

    const user = await User.findById(idUser);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const tweets = await Tweet.find({ user: idUser }).populate("medias", "-__v -tweet");
    res.status(200).json(tweets);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error in fetching tweet" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.findById(id).populate("medias", "-__v -tweet");

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    res.status(200).json(tweet);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching tweet" });
  }
};

const create = async (req, res) => {
  try {
    if (req.body.content.length > 280) {
      return res
        .status(400)
        .json({ message: "Content can't exceed 280 characters !" });
    }

    const { content, medias } = req.body;

    const wrongTypeMedia = medias.find(
      (media) => !MEDIA_TYPES.includes(media.type)
    );

    if (wrongTypeMedia) {
      return res.status(400).json({ message: "Invalid media type" });
    }

    const tweet = await Tweet.create({ content, user: req.user.id });

    if (medias) {
      medias.forEach((media) => createTweetMedia(tweet._id, media));
    }

    res.status(201).json({ message: "Tweet has been created.", tweet });
  } catch (error) {
    res.status(500).json({ error: "Error in creating tweet" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.findById(id);

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    if (!tweet.user.equals(req.user.id)) {
      return res.status(403).json({
        message:
          "User doesn't have permission to delete tweet from someone else !",
      });
    }
    if (!tweet.user.equals(req.user.id)) {
      return res.status(403).json({
        message:
          "User doesn't have permission to delete tweet from someone else !",
      });
    }

    // Delete medias then tweet
    deleteTweetMedia(tweet._id);
    await Tweet.findByIdAndDelete(tweet._id);
    res.status(200).json({ message: "Tweet has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting tweet" });
  }
};

const createTweetMedia = async (tweetId, media) => {
  // Create Media
  const newMedia = await Media.create({ ...media, tweet: tweetId });

  // Push Media into Tweet
  await Tweet.findByIdAndUpdate(
    tweetId,
    { $push: { medias: newMedia._id } },
    { new: true }
  );
};

// Delete Medias From Tweet
const deleteTweetMedia = async (tweetId) => {
  await Media.deleteMany({ tweet: tweetId });
};

export default {
  getAll,
  getAllByIdUser,
  getById,
  create,
  deleteById,
};
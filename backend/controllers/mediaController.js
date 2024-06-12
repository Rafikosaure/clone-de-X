import Media from "../models/mediaModel.js";
import User from "../models/userModel.js";
import Tweet from "../models/tweetModel.js";

const getAll = async (req, res) => {
  try {
    const medias = await Media.find();
    res.status(200).json(medias);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching media" });
  }
};

const getAllByIdTweet = async (req, res) => {
  try {
    const { idTweet } = req.params;

    const tweet = await Tweet.findById(idTweet);

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    const medias = await Media.find({ tweet: idTweet });
    res.status(200).json(medias);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching media" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);

    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching media" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { idUser } = req.params;

    const user = await User.findById(idUser);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const media = await Media.findOne({ user: idUser });

    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching media" });
  }
};

export default {
  getAll,
  getAllByIdTweet,
  getById,
  getUserProfile,
};

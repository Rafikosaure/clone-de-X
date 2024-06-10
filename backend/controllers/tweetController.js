import Tweet from "../models/tweetModel.js";
import User from "../models/userModel.js";

const getAll = async (req, res) => {
  try {
    const tweets = await Tweet.find();
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

    const tweets = await Tweet.find({ user: idUser });
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching tweet" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.findById(id);

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
    const tweet = await Tweet.create({ ...req.body, user: req.user.id });
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

    if (!tweet.user.equals(req.user.id)) {
      return res.status(403).json({
        message:
          "User doesn't have permission to delete tweet from someone else !",
      });
    }

    await Tweet.findByIdAndDelete(id);
    res.status(200).json({ message: "Tweet has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting tweet" });
  }
};

export default {
  getAll,
  getAllByIdUser,
  getById,
  create,
  deleteById,
};

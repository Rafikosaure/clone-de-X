import User from "../models/userModel.js";
import Tweet from "../models/tweetModel.js";
import Media from "../models/mediaModel.js";
import Like from "../models/likeModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../configs/envConfig.js";

const register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User has been created!", user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res) => {
  try {
    // Recherche l'user dans la base de données par son email
    const user = await User.findOne({
      email: req.body.email,
    });
    // Si l'user n'est pas trouvé, renvoie une erreur 404
    if (!user) return res.status(404).json("User not found !");
    /* 
          Compare le mot de passe fourni dans la requête
          avec le mot de passe de l'utilisateur (qui est dans la bdd)
        */
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    /* 
          Si le mot de passe est incorrect, renvoie une erreur 400.
        */
    if (!comparePassword) return res.status(400).json("Wrong Credentials ! ");

    // Crée un jeton JWT pour l'utilisateur avec son ID,
    // expire après 24 heures
    const token = jwt.sign(
      // Le premier argument est la charge utile du token.
      // Ici, nous incluons l'ID de l'utilisateur
      { id: user._id },
      // Le deuxième argument est la clé secrète,
      // qui est utilisée pour signer le token.
      // Nous la récupérons à partir
      // des variables d'environnement
      ENV.TOKEN,
      // Le troisième argument est un objet
      // contenant les options du token.
      // Ici, nous définissons une durée
      // d'expiration de 24 heures pour le token
      { expiresIn: "24h" }
    );

    // envoi le jeton (token) JWT sous forme de cookie HTTPOnly
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(user);
  } catch (e) {
    console.log(e);
  }
};

const getAll = async (req, res) => {
  try {
    const users = await User.find().populate("picture", "-__v -user");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching user" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("picture", "-__v -user");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching user" });
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const { picture, password, ...other } = req.body;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user._id.equals(req.user.id)) {
      return res.status(403).json({
        message: "User doesn't have permission to update another user",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(
      id,
      { ...other, password: hashedPassword },
      { new: true }
    );

    res.status(200).json({ message: "User has been updated" });
  } catch (error) {
    res.status(500).json({ error: "Error in updating user" });
  }
};

const updatePicture = async (req, res) => {
  try {
    const id = req.user.id;
    const { picture } = req.body;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await updateUserProfile(id, picture);

    res.status(200).json({ message: "User has been updated" });
  } catch (error) {
    res.status(500).json({ error: "Error in updating user" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user._id.equals(req.user.id)) {
      return res.status(403).json({
        message: "User doesn't have permission to delete another user",
      });
    }

    // Delete User Tweets with their Medias and Likes
    await deleteTweetUser(id);

    // Delete User profile Media
    await deleteUserProfile(id);

    // Delete User Likes
    await deleteUserLikes(id);

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting user" });
  }
};

// Delete Medias then Tweets from User
const deleteTweetUser = async (userId) => {
  const tweets = await Tweet.find({ user: userId });

  tweets.forEach(async (tweet) => {
    // Delete Media from Tweets of User
    await Media.deleteMany({ tweet: tweet._id });

    // Delete Likes from Tweets of User
    await Like.deleteMany({ tweet: tweet._id });
  });

  // Delete Tweets of User
  await Tweet.deleteMany({ user: userId });
};

// Update Media from User
const updateUserProfile = async (userId, media) => {
  // Delete old Media from User
  await deleteUserProfile(userId);

  // Create Media
  const newMedia = await Media.create({ ...media, user: userId });

  // Add Media into User
  await User.findByIdAndUpdate(userId, { picture: newMedia }, { new: true });
};

// Delete Media from User
const deleteUserProfile = async (userId) => {
  await Media.deleteMany({ user: userId });
};

const deleteUserLikes = async (userId) => {
  const likes = await Like.find({ user: userId });
  
  // Remove Likes reference of User on each liked Tweet
  likes.forEach(async (like) => {
    await Tweet.findByIdAndUpdate(
      like.tweet,
      { $pull: { likes: like._id } },
      { new: true }
    );
  });

  // Delete Likes of User
  await Like.deleteMany({ user: userId });
};

export default {
  register,
  login,
  getAll,
  getById,
  updateById,
  updatePicture,
  deleteById,
};

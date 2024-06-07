import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { ENV } from "../configs/envConfig.js";


const register = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            ...req.body,
            password: hashedPassword,
        });
        res.status(201).json("User has been created!");
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const login = async (req, res) => {
    try {
        // Recherche l'user dans la base de données par son email
        const user = await User.findOne({
            email: req.body.email
        });
        console.log(user)
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
}


export default {
    register,
    login
}
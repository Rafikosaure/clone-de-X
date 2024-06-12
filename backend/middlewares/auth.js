import jwt from 'jsonwebtoken'
import { ENV } from '../configs/envConfig.js';
import { createError } from './error.js';

const verifieToken = (req, res, next) => {
  // Récupère le jeton (token) JWT à partir des cookies de la requête
  const token = req.cookies.access_token;

  // Si le jeton (token) n'est pas présent, 
  // renvoie une erreur 401 (accès refusé)
  if(!token) return next(createError(401, "Acces Denied"))

  // Vérifier la validité du jeton en utilisant jwt.verify
  jwt.verify(token, ENV.TOKEN, (err, user) => {
    // si une erreur se produit lors de la vérification du jeton
    if(err) {
      // Renvoie une erreur 403 (interdit) 
			// car le jeton (token) n'est pas valide
      return next(createError(403, {message: "Token non valide !", error: err.message}))
    }
    // si la vérification réussit, 
		// ajoute les information de l'utilisateur
		// dans l'objet req
    req.user = user

    next();
  })
}

export default { verifieToken }
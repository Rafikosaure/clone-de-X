// Déclare une fonction 'createError' qui prend deux paramètres: 'status' et 'message'
export const createError = (status, message) => {
    // Crée une nouvelle instance de l'objet Error
    const err = new Error();
  
    // Attribue le paramètre 'status' à la propriété 'status' de l'objet 'err'
    err.status = status;
  
    // Attribue le paramètre 'message' à la propriété 'message' de l'objet 'err'
    err.message = message;
  
    // Retourne l'objet 'err' avec ses propriétés 'status' et 'message'
    return err;
};
  
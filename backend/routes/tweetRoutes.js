import express from "express";
import tweetCtrl from "../controllers/tweetController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", tweetCtrl.getAll);
router.get("/user/:idUser", tweetCtrl.getAllByIdUser);
router.get("/:id", tweetCtrl.getById);
router.post("/", auth.verifieToken, tweetCtrl.create);
router.post("/:id/retweet", auth.verifieToken, tweetCtrl.createRetweet);
router.delete("/:id", auth.verifieToken, tweetCtrl.deleteById);

export default router;

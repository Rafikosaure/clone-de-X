import express from "express";
import mediaCtrl from "../controllers/mediaController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", mediaCtrl.getAll);
router.get("/:id", mediaCtrl.getById);
router.get("/user/:idUser", mediaCtrl.getUserProfile);
router.get("/tweet/:idTweet", mediaCtrl.getAllByIdTweet);

export default router;

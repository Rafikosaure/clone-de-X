import express from "express";
import likeCtrl from "../controllers/likeController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/tweet/:id", auth.verifieToken, likeCtrl.create);
router.delete("/tweet/:id", auth.verifieToken, likeCtrl.deleteById);

export default router;

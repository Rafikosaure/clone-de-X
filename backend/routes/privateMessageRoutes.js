import express from "express";
import privateMessageCtrl from "../controllers/privateMessageController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth.verifieToken, privateMessageCtrl.getAll);
router.get("/user/:id", auth.verifieToken, privateMessageCtrl.getAllByIdUser);
router.post("/", auth.verifieToken, privateMessageCtrl.create);
router.delete("/:id", auth.verifieToken, privateMessageCtrl.deleteById);

export default router;

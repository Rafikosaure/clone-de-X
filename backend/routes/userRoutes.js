import express from "express";
import userCtrl from "../controllers/userControllers.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/", userCtrl.getAll);
router.get("/logged", auth.verifieToken, userCtrl.findLoggedOne);
router.get("/:id", userCtrl.getById);
router.put("/updatePic", auth.verifieToken, userCtrl.updatePicture);
router.put("/:id", auth.verifieToken, userCtrl.updateById);
router.delete("/:id", auth.verifieToken, userCtrl.deleteById);

export default router;

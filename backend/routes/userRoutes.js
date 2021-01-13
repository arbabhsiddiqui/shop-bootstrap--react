import express from "express";

const router = express.Router();
import {
  userAuth,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.post("/login", userAuth);
// router.get("/profile", getUserProfile);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;

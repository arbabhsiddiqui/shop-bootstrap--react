import express from "express";

const router = express.Router();
import {
  userAuth,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, admin, getUsers);
router.route("/").post(registerUser);
router.post("/login", userAuth);
// router.get("/profile", getUserProfile);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/:id").delete(protect, admin, deleteUser);

export default router;

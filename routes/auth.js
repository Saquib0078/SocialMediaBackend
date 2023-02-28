import express from "express";
const router = express.Router();

//controler
import {
  register,
  login,
  currentUser,
  forgotPassword,
  profileUpdate,
  findPeople,
  userFollow,
  addFollower,
  userFollowing,
  removeFollower,
  userUnfollow,
  searchUser,
  getUser,
  contact,
} from "../controllers/auth";

// middleware
import { isAdmin, requireSignin } from "../middlewares/auth";

router.post("/register", register);

router.post("/login", login);

router.post("/contact", contact);

router.get("/current-user", requireSignin, currentUser);

router.post("/forgot-password", forgotPassword);
router.put("/profile-update", requireSignin, profileUpdate);

router.get("/find-people", requireSignin, findPeople);

router.put("/user-follow", requireSignin, addFollower, userFollow);

router.put("/user-unfollow", requireSignin, removeFollower, userUnfollow);

router.get("/user-following", requireSignin, userFollowing);

router.get("/search-user/:query", searchUser);
router.get("/user/:_username", getUser);

router.get("/current-admin", requireSignin, isAdmin, currentUser);

module.exports = router;

import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import { requireSignin, canEditDeletePost, isAdmin } from "../middlewares/auth";

import {
  createPost,
  uploadImage,
  postsByUser,
  userPost,
  updatePost,
  deletePost,
  fetchAllPosts,
  likePost,
  unlikePost,
  removeComment,
  addComment,
  totalPosts,
  posts,
} from "../controllers/post";

router.post("/create-post", requireSignin, createPost);

router.post(
  "/upload-image",
  requireSignin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);

router.get("/user-posts", requireSignin, postsByUser);

router.get("/user-post/:_id", requireSignin, userPost);

router.put("/update-post/:_id", requireSignin, canEditDeletePost, updatePost);

router.delete(
  "/delete-post/:_id",
  requireSignin,
  canEditDeletePost,
  deletePost
);

router.get("/posts/:page", requireSignin, fetchAllPosts);

router.put("/like-post", requireSignin, likePost);
router.put("/unlike-post", requireSignin, unlikePost);

router.put("/add-comment", requireSignin, addComment);
router.put("/remove-comment", requireSignin, removeComment);

router.get("/total-posts", totalPosts);

router.get("/posts", posts);

router.delete("/admin/delete-post/:_id", requireSignin, isAdmin, deletePost);
// router.delete(
//   "/admin/delete-comment/:_id",
//   requireSignin,
//   isAdmin,
//   removeComment
// );

module.exports = router;

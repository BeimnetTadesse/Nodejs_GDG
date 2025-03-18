import { Router } from "express";
import { signup, signin, createPost, getFilteredPosts, approvePostHandler, deletePostHandler } from "../controllers/index.js";
import { authMiddleware, adminMiddleware } from "../middleware/index.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);

// Blog post routes
router.post("/posts", authMiddleware, createPost);
router.get("/posts", getFilteredPosts);

// Admin routes
router.put("/posts/approve/:postId", adminMiddleware, approvePostHandler);
router.delete("/posts/:postId", adminMiddleware, deletePostHandler);

export default router;

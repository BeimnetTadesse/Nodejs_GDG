import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addUser, findUser, addPost, getPosts, approvePost, deletePost } from "../services/index.js";

// Signup function
export const signup = async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = findUser(email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hashedPassword, role: role || "user" };

    addUser(newUser);

    res.status(201).json({ message: "User registered successfully", user: newUser });
};

// Signin function
export const signin = async (req, res) => {
    const { email, password } = req.body;

    const user = findUser(email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, "secretKey", { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
};

// Create Blog Post
export const createPost = (req, res) => {
    const { title, content, category, tags } = req.body;
    const { email } = req.user; // Extract user info from JWT

    if (!title || !content || !category) {
        return res.status(400).json({ message: "Title, content, and category are required" });
    }

    const newPost = {
        id: posts.length + 1,
        title,
        content,
        category,
        tags: tags || [],
        author: email,
        date: new Date().toISOString(),
        approved: false, // Default false until admin approves
    };

    addPost(newPost);
    res.status(201).json({ message: "Post created successfully. Waiting for admin approval.", post: newPost });
};

// Get Posts with Filters
export const getFilteredPosts = (req, res) => {
    const filters = req.query;
    const filteredPosts = getPosts(filters);
    res.status(200).json(filteredPosts);
};

// Admin: Approve Post
export const approvePostHandler = (req, res) => {
    const { postId } = req.params;
    approvePost(parseInt(postId));
    res.status(200).json({ message: "Post approved successfully" });
};

// Admin: Delete Post
export const deletePostHandler = (req, res) => {
    const { postId } = req.params;
    deletePost(parseInt(postId));
    res.status(200).json({ message: "Post deleted successfully" });
};

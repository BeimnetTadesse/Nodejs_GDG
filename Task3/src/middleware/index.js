import jwt from "jsonwebtoken";
import { findUser } from "../services/index.js";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, "secretKey");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

export const adminMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, "secretKey");
        const user = findUser(decoded.email);

        if (user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};


// utils/authGuard.js
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constans";

export const duelAuthGuard = async (req, targetId) => {
    try {
        const authHeader = await req.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return { isAccess: false };
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        const role = decoded?.role;

        // ✅ admin হলে access
        if (role === "admin") {
            return { isAccess: true };
        }

        // ✅ student হলে নিজের ID হতে হবে
        if (
            decoded?.id &&
            decoded?.username &&
            decoded?.phone &&
            decoded?.id === targetId
        ) {
            return { isAccess: true };
        }

        return { isAccess: false };
    } catch (error) {
        return { isAccess: false };
    }
};

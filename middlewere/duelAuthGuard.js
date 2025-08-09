
// utils/authGuard.js
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constans";

export const duelAuthGuard = async (req) => {
    try {
        const authHeader = await req.headers.get("authorization");

        // if (!authHeader || !authHeader.startsWith("Bearer ")) {
        //     return { isAccess: false };
        // }
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return {
                error: true,
                response: NextResponse.json(
                    { message: "অননুমোদিত অনুরোধ!" },
                    { status: 401 }
                ),
            };
        }


        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        // const role = decoded?.role;

        // ✅ admin হলে access
        // if (role === "admin") {
        //     return { isAccess: true };
        // }

        return {
            error: false,
            info: decoded, // টোকেনে যা ছিল তাই ফেরত দিচ্ছে
        };
        // ✅ student হলে নিজের ID হতে হবে
        // if (
        //     decoded?.id &&
        //     decoded?.username &&
        //     decoded?.phone &&
        //     decoded?.id === targetId
        // ) {
        //     return { isAccess: true };
        // }


    } catch (error) {
        return { isAccess: false };
    }
};

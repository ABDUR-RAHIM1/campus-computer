// utils/authGuard.js
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constans";
import { NextResponse } from "next/server";

export const duelAuthGuard = async (req) => {
  try {
    const authHeader = req.headers.get("authorization");

    // 🔒 Authorization না থাকলে সরাসরি Block
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        error: true,
        access: false,
        response: NextResponse.json(
          { message: "অননুমোদিত অনুরোধ!" },
          { status: 401 }
        ),
      };
    }

    // 🔑 টোকেন verify
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // যদি টোকেনই invalid হয়
    if (!decoded) {
      return {
        error: true,
        access: false,
        response: NextResponse.json(
          { message: "টোকেন সঠিক নয় বা মেয়াদ শেষ!" },
          { status: 403 }
        ),
      };
    }

    // 🔎 Role check
    const role = decoded?.role;

    // ✅ যদি admin হয় → Access Granted
    if (role === "admin") {
      return {
        error: false,
        access: true,
        role: "admin",
        info: decoded,
      };
    }

    // ✅ যদি অন্য কোনো user হয় (role থাক বা নাই, টোকেন valid হলেই)
    return {
      error: false,
      access: true,
      role: role || "user",
      info: decoded,
    };

  } catch (error) {
    return {
      error: true,
      access: false,
      response: NextResponse.json(
        { message: "টোকেন সঠিক নয় বা মেয়াদ শেষ!" },
        { status: 403 }
      ),
    };
  }
};


// utils/authGuard.js
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constans";
import { NextResponse } from "next/server";



export const duelAuthGuard = async (req) => {
  try {
    const authHeader = await req.headers.get("authorization");

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

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const role = decoded?.role;

    // ✅ admin হলে role check করবে
    if (role === "admin") {
      return {
        error: false,
        access: true,
        info: decoded,
      };
    }

    // ✅ অন্য যে-কোনো role (student, user, etc.) → শুধু টোকেন valid হলেই access
    return {
      error: false,
      access: true,
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





// export const duelAuthGuard = async (req) => {
//     try {
//         const authHeader = await req.headers.get("authorization");

//         let access = false;

//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return {
//                 error: true,
//                 access: access,
//                 response: NextResponse.json(
//                     { message: "অননুমোদিত অনুরোধ!" },
//                     { status: 401 }
//                 ),
//             };
//         }


//         const token = authHeader.split(" ")[1];
//         const decoded = jwt.verify(token, JWT_SECRET);

//         const role = decoded?.role;


//         // ✅ admin হলে access
//         if (role === "admin") {
//             access = true
//         }

//         return {
//             error: false,
//             access: true,
//             info: decoded, // টোকেনে যা ছিল তাই ফেরত দিচ্ছে
//         };
      

//     } catch (error) {
//         return { isAccess: false };
//     }
// };

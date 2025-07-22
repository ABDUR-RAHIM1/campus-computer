import { API_URL } from "@/constans";
import { StudentToken } from "@/getToken";

export const PostAction = async (payload) => {
    const token = await StudentToken()

    try {
        const { method, endpoint, body } = payload;
 

        const res = await fetch(API_URL + endpoint, {
            method: method,
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const result = await res.json();

        return { status: res.status, data: result };
    } catch (error) {
        console.error("Fetch Error:", error);
        return { status: 500, data: { message: "Internal Error" } };
    }
};

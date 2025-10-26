import { API_URL } from "@/constans";
import { AdminToken } from "@/getToken";

export const PostActionAdmin = async (payload) => {
    const token = await AdminToken()

    try {
        const { method, endpoint, body } = payload;

        console.log({payload})

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

import { API_URL } from "@/constans";
import { AdminToken } from "@/getToken";

export const DeleteActionAdmin = async (endpoint) => {
    const token = await AdminToken()

    try {


        const res = await fetch(API_URL + endpoint, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const result = await res.json();

        return { status: res.status, data: result };
    } catch (error) {
        console.error("Fetch Error:", error);
        return { status: 500, data: { message: "Internal Error" } };
    }
};

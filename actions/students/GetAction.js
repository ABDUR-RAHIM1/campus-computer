
import { API_URL } from "@/constans";
import { StudentToken } from "@/getToken";

export const GetAction = async (endpoint) => {
    const token = await StudentToken()

    try {

        const res = await fetch(API_URL + endpoint, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
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

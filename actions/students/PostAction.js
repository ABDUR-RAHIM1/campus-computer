import { API_URL } from "@/constans";

export const PostAction = async (payload) => {
    const token = "dummy token";

    try {
        const { method, endpoint, body } = payload;

    console.log( "api" , API_URL+payload.endpoint)

        const res = await fetch(API_URL + endpoint, {
            method: method,
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const result = await res.json();
        console.log({ result })
        return { status: res.status, data: result };
    } catch (error) {
        console.error("Fetch Error:", error);
        return { status: 500, data: { message: "Internal Error" } };
    }
};

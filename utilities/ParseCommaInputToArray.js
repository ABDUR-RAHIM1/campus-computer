// 📌 এটাকে component এর উপরে বা ফাইলের উপরে রাখো
export const ParseCommaInputToArray = (value) => {
    if (!value) return [];

    return value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
};
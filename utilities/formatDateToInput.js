// Date Object বা ISO string → "YYYY-MM-DD"
export function formatDateToInput(dateStringOrDateObj) {
    const date = new Date(dateStringOrDateObj);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based month
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

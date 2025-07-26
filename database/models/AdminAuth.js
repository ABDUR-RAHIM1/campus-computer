import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: [true, "মোবাইল নম্বর আবশ্যক"],
            match: [/^01[0-9]{9}$/, "সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন (যেমনঃ 01XXXXXXXXX)"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "পাসওয়ার্ড আবশ্যক"],
            minlength: [6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"],
        },
        role: {
            type: String,
            default: "admin",
            enum: ["admin", "modaretor"],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const AdminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);
export default AdminModel;

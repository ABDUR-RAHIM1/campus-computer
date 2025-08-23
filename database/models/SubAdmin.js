import mongoose from "mongoose";

const SubAdminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            match: [/^01[0-9]{9}$/, "Invalid Bangladeshi phone number"], // চাইলে regex বাদ দিতে পারো
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
        },
        description: {
            type: String,
        },
        photo: {
            type: String,
        },
    },
    { timestamps: true }
);

const SubAdminModel =
    mongoose.models.SubAdmin || mongoose.model("SubAdmin", SubAdminSchema);

export default SubAdminModel;

import mongoose from "mongoose";

const studentAuthSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "নাম আবশ্যক"],
        match: [/^[\u0980-\u09FFa-zA-Z\s]+$/, "নামে শুধুমাত্র বাংলা বা ইংরেজি অক্ষর থাকতে পারে।"],
        minlength: [3, "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।"],
        maxlength: [30, "নাম ৩০ অক্ষরের বেশি হতে পারবে না।"]
    },
    phone: {
        type: String,
        required: [true, "মোবাইল নম্বর আবশ্যক"],
        match: [/^01[0-9]{9}$/, "সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন (যেমনঃ 01XXXXXXXXX)"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "পাসওয়ার্ড আবশ্যক"],
        minlength: [6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।"]
    },

    // ✅ Optional Fields for profile
    email: String,
    instituteName: String,
    department: String,
    class: String,
    session: String,
    registrationNumber: String,
    boardRoll: String,
    classRoll: String,
    pin: String,
    guardianPhone: String,
    address: String,
    birthDate: String,
    bloodGroup: String,
    gender: String,
    hasImprovement: Boolean,
    improvementSubjects: { type: [String] },
    profilePicture: String,

}, { timestamps: true });

const StudentAuthModel = mongoose.models.studentAuth || mongoose.model("studentAuth", studentAuthSchema);

export default StudentAuthModel;

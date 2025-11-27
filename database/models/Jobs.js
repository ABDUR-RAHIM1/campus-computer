import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        payPaymentFee: {
            type: Number,
            required: true,
            default: 0,
        },
        charge: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        noticeLink: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Reuse model if already compiled (Next.js hot reload fix)
const JobPost =
    mongoose.models.JobPost || mongoose.model("JobPost", jobPostSchema);

export default JobPost;

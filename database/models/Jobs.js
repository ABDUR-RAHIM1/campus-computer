import mongoose from "mongoose";

const categoryFeeSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    payPaymentFee: {
        type: Number,
        required: true,
        default: 0,
    },
});

const jobPostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
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
        categories: {
            type: [categoryFeeSchema], // array of category+fee
            default: [],
        },
    },
    { timestamps: true }
);

// Reuse model if already compiled (Next.js hot reload fix)
const JobPost =
    mongoose.models.JobPost || mongoose.model("JobPost", jobPostSchema);

export default JobPost;

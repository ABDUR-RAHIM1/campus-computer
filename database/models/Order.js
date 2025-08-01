
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    isOthersStudent: {
        type: Boolean,
        required: true
    },
    otherStudentInfo: {
        type: Object,
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "studentProfile",
        required: true,
    },
    reference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "studentAuth",
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
    },
    department: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "pending", "success"],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

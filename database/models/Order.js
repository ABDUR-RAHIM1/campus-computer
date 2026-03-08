
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    // isOthersStudent: {
    //     type: Boolean,
    //     required: true
    // },

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
    collegeFee: {
        type: Number,
        required: true
    },
    subjectFee: {
        type: Number,
        default: 0,
    },
    processingFee: {
        type: Number,
        default: 0,
    }, // new 
    chargeFee: {
        type: Number,
        default: 0,
    },
    subTotal: {
        type: Number,
        required: true
    }, // new 
    billerCharge: {
        type: Number,
        required: true
    }, // new 
    totalFee: {
        type: Number,
        default: 0,
    },
    cashOutCharge: {
        type: Number,
        default: 0,
    },
    calculatedTotal: {
        type: Number,
        required: true
    }, // new 
    status: {
        type: String,
        enum: ["pending", "active", "success", "cancel"],
        default: "pending"
    },
    orderType: {
        type: String,
        enum: ["full_service", "office_copy"],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
    cancelOrderInfo: {
        recivedNumber: { type: String },
        reason: { type: String },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

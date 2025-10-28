import mongoose from "mongoose";

const paymentInfoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "studentAuth",  
            required: true
        },
        profileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "studentProfile",
            required: true
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",  
            required: true
        },
        txnId: {
            type: String,
            required: true
        },
        senderNumber: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        method: {
            type: String,
            enum: ["Bkash", "Nagad", "Rocket", "Other"], 
            required: true
        },
        verified: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

const PaymentInfoModel =
    mongoose.models.PaymentInfo ||
    mongoose.model("PaymentInfo", paymentInfoSchema);

export default PaymentInfoModel;

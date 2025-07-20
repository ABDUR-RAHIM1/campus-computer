import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },
        program: {
            type: String, // Honors, Degree, BSc, BSS ইত্যাদি
            required: true,
            trim: true,
        },
        department: {
            type: String, // যদি প্রযোজ্য হয়, না হলে null বা খালি রাখা যাবে
            default: null,
            trim: true,
        },
        classYear: {
            type: String, // 1st Year, 2nd Year ইত্যাদি
            required: true,
            trim: true,
        },
        session: {
            type: String,
            default: null,
            trim: true,
        },
        fee: {
            type: Number,
            required: true,
            min: 0,
        },
        requiredDocuments: {
            type: [String], // যেমন: ['photo', 'nid', 'paymentSlip']
            default: [],
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const ServiceModel = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

export default ServiceModel;

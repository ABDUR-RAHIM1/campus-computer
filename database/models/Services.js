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
            type: String, // যেমন: Honors, Degree, BSc ইত্যাদি
            required: true,
            trim: true,
        },
        classYear: {
            type: String,
            trim: true,
        },
        session: {
            type: String,
            default: null,
            trim: true,
        },

        // 🔥 Multi-department fee mapping
        departmentFees: [
            {
                department: {
                    type: String,
                    required: true,
                    trim: true,
                },
                fee: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],

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

const ServiceModel =
    mongoose.models.Service || mongoose.model("Service", ServiceSchema);

export default ServiceModel;

import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
    {
        institute: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "SubAdmin",
        },
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
            type: String, // ১ম বর্ষ, ২য় বর্ষ ইত্যাদি
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
                collegeFee: {
                    type: Number, // আপনার বেস ফি (যেমন: ১৪০০)
                    required: true,
                    min: 0,
                },
                subjectFee: {
                    type: Number, // প্রতি সাবজেক্ট ফি (যেমন: ৩০০)
                    required: false,
                    default: 0,
                    min: 0,
                },
                chargeFee: {
                    type: Number, // আপনার সার্ভিস চার্জ
                    required: true,
                    min: 0,
                },
                processingFee: {
                    type: Number, // office Stuff Charge (extra) #new#
                    required: true,
                    min: 0,
                },
                // rocketBillerCharge: {
                //     type: Number, // Rocket biller Charge #new#
                //     required: true,
                //     min: 0,
                // },
                // totalFee: {
                //     type: Number, // সিস্টেম জেনারেটেড মোট ফি (সিঙ্গেল সাবজেক্টের জন্য)
                //     required: true,
                //     min: 0,
                // },
            },
        ],

        requiredDocuments: {
            type: [String], // যেমন: ['photo', 'nid', 'marksheet']
            default: [],
        },

        // 🔥 ৫টি নির্দিষ্ট ক্যাটাগরি ইংরেজি নামে
        type: {
            type: String,
            required: true,
            enum: [
                "admission_with_form_fillup",
                "year_change_admission",
                "regular_form_fillup",
                "improvement_form_fillup",
                "irregular_form_fillup",
            ],
            trim: true,
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

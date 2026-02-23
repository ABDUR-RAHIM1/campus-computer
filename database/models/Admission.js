import mongoose from "mongoose";

const AdmissionSchema = new mongoose.Schema({
    institute: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SubAdmin",
    },
    serviceName: { type: String, required: true },
    deadline: { type: Date, required: true },
    serviceCharge: { type: Number, required: true },
    type: { type: String, enum: ["new_admission"], default: "new_admission" },
    formFields: [{
        id: { type: String },
        label: { type: String, required: true },
        type: { type: String, required: true },
        placeholder: { type: String },
        required: { type: Boolean, default: true },
    }]
}, { timestamps: true });

const AdmissionModel = mongoose.models.Admissions || mongoose.model("Admissions", AdmissionSchema);

export default AdmissionModel;
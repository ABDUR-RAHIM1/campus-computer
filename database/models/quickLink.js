import mongoose from "mongoose";

const quickLinkSchema = new mongoose.Schema(
    {
        serviceName: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        officialLink: {
            type: String,
            required: true,
        },
        requiredDocs: {
            type: [String],
            default: [],
        },
        status: {
            type: String,
            enum: ["Active", "Inactive", "Offline"],
            default: "Active",
        },
        instructions: {
            type: String,
            default: "",
        },
        documentLink: {
            type: String,
            default: "", // optional field, so default empty
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);
const QuickLinkModel = mongoose.models.QuickLink || mongoose.model("QuickLink", quickLinkSchema);

export default QuickLinkModel

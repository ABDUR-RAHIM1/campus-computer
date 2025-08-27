
import mongoose from "mongoose";

const educationSchema = mongoose.Schema({
    eduType: {
        type: String,
        required: true,
    },
    categorie: {  // scince , arts , commarce etc
        type: String,
        required: true,
    },
    instituteName: {
        type: String,
        required: true,
    },
    passingYear: {
        type: String,
        required: true,
    },
    board: {
        type: String,
        required: true,
    },
    roll: {
        type: String,
        required: true,
    },
    reg: {
        type: String,
        required: true,
    },
    gpa: {
        type: String,
        required: true,
    },
})


const jobProfileSchema = mongoose.Schema({
    isOtherPerson: {
        type: Boolean,
        required: true,
        default: false
    },
    studentId: {
        type: mongoose.Schema.ObjectId,
        ref: "studentAuth",
        required: true,
    },
    nameBn: {
        type: String,
        required: true
    },
    nameEn: {
        type: String,
        required: true
    },
    fatherNameBn: {
        type: String,
        required: true
    },
    fatherNameEn: {
        type: String,
        required: true
    },
    motherNameBn: {
        type: String,
        required: true
    },
    motherNameEn: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    presentAddress: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    birthNumber: {
        type: String,
        required: true
    },
    nidNumber: {
        type: String,
        required: true
    },
    passportId: {
        type: String,
    },
    matarialStatus: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    otherMobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    quota: {
        type: String,
        required: true
    },
    educations: {
        type: [educationSchema],
        required: true
    },
    extra: {
        type: String,
    },
    cvLink: {
        type: String,
    },
    photo: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    documents: {
        type: Array,
    }
});


const JobProfileModel = mongoose.models.jobProfile || mongoose.model("jobProfile", jobProfileSchema);

export default JobProfileModel;
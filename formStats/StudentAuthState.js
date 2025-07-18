
export const studentAuthFormState = {
    // ✅ Required Fields
    username: "",
    phone: "",
    password: "",
    registrationNumber: "",
    class: "",
    department: "",
    session: "",

    // ✅ Optional Fields  
    classRoll: "",
    boardRoll: "",
    pin: "",
    email: "",
    guardianPhone: "",
    address: "",
    photo: "",             // image url or file
    birthDate: "",         // YYYY-MM-DD
    gender: "",            // "Male" | "Female" | "Other"
    bloodGroup: "",        // "A+", "O+", etc.
    instituteName: "",     // if needed for multiple institutes
    hasImprovement: false,
    improvementSubjects: [],
    profilePicture: ""
};

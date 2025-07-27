const yearData = {
    honors: [
        { label: "১ম বর্ষ", value: "১ম বর্ষ" },
        { label: "২য় বর্ষ", value: "২য় বর্ষ", },
        { label: "৩য় বর্ষ", value: "৩য় বর্ষ" },
        { label: "৪র্থ বর্ষ", value: "৪র্থ বর্ষ", },
    ],
    degree: [
        { label: "১ম বর্ষ", value: "১ম বর্ষ" },
        { label: "২য় বর্ষ", value: "২য় বর্ষ" },
        { label: "৩য় বর্ষ", value: "৩য় বর্ষ" },
    ],
    intermediate: [
        { label: "১ম বর্ষ", value: "১ম বর্ষ" },
        { label: "২য় বর্ষ", value: "২য় বর্ষ" },
    ],
};

export const getYearsByProgram = (program) => {
    return yearData[program] || [];
};

const departmentData = {
  honors: [
    { label: "বাংলা", value: "বাংলা" },
    { label: "ইংরেজি", value: "ইংরেজি" },
    { label: "ইসলামের ইতিহাস ও সংস্কৃতি", value: "ইসলামের ইতিহাস ও সংস্কৃতি" },
    { label: "পৌরনীতি ও সুশাসন", value: "পৌরনীতি ও সুশাসন" },
    { label: "অর্থনীতি", value: "অর্থনীতি" },
    { label: "সমাজবিজ্ঞান", value: "সমাজবিজ্ঞান" },
    { label: "দর্শন", value: "দর্শন" },
    { label: "ইতিহাস", value: "ইতিহাস" },
    { label: "গণিত", value: "গণিত" },
    { label: "রসায়ন", value: "রসায়ন" },
    { label: "ভৌতবিজ্ঞান", value: "ভৌতবিজ্ঞান" },
    { label: "জীববিজ্ঞান", value: "জীববিজ্ঞান" },
    { label: "ভূগোল ও পরিবেশ", value: "ভূগোল ও পরিবেশ" },
    { label: "দর্শনশাস্ত্র", value: "দর্শনশাস্ত্র" },
    { label: "মনোবিজ্ঞান", value: "মনোবিজ্ঞান" },
    { label: "ব্যবস্থাপনা", value: "ব্যবস্থাপনা" },
    { label: "হিসাববিজ্ঞান", value: "হিসাববিজ্ঞান" },
    { label: "মার্কেটিং", value: "মার্কেটিং" },
    { label: "ফিন্যান্স ও ব্যাংকিং", value: "ফিন্যান্স ও ব্যাংকিং" },
  ],
  degree: [
    { label: "বিএ", value: "বিএ" },
    { label: "বিএসএস", value: "বিএসএস" },
    { label: "বিএসসি", value: "বিএসসি" },
    { label: "বিকম", value: "বিকম" },
  ],
  intermediate: [
    { label: "বিজ্ঞান বিভাগ", value: "বিজ্ঞান বিভাগ" },
    { label: "মানবিক বিভাগ", value: "মানবিক বিভাগ" },
    { label: "ব্যবসায় শিক্ষা বিভাগ", value: "ব্যবসায় শিক্ষা বিভাগ" }
  ]
};



export const getDepartmentsByProgram = (program) => {
  return departmentData[program] || [];
};

export default departmentData;

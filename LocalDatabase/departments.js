const departmentData = {
  honors: [
    { label: "বাংলা", value: "বাংলা" },
    { label: "ইতিহাস", value: "ইতিহাস" },
    { label: "ইসলামের ইতিহাস ও সংস্কৃতি", value: "ইসলামের ইতিহাস ও সংস্কৃতি" },
    { label: "দর্শন", value: "দর্শন"},
    { label: "রাষ্ট্রবিজ্ঞান", value: "রাষ্ট্রবিজ্ঞান" },
    { label: "অর্থনীতি", value: "অর্থনীতি" },
    { label: "হিসাববিজ্ঞান", value: "হিসাববিজ্ঞান" },
    { label: "ব্যবস্থাপনা", value: "ব্যবস্থাপনা"},
    { label: "উদ্ভিদবিদ্যা", value: "উদ্ভিদবিদ্যা"},
    { label: "প্রাণীবিদ্যা", value: "প্রাণীবিদ্যা"},

    { label: "ইংরেজি", value: "ইংরেজি" },
    { label: "পৌরনীতি ও সুশাসন", value: "পৌরনীতি ও সুশাসন" },
    { label: "সমাজবিজ্ঞান", value: "সমাজবিজ্ঞান" },
    { label: "গণিত", value: "গণিত" },
    { label: "রসায়ন", value: "রসায়ন" },
    { label: "ভৌতবিজ্ঞান", value: "ভৌতবিজ্ঞান" },
    { label: "জীববিজ্ঞান", value: "জীববিজ্ঞান" },
    { label: "ভূগোল ও পরিবেশ", value: "ভূগোল ও পরিবেশ" },
    { label: "মনোবিজ্ঞান", value: "মনোবিজ্ঞান" },
    { label: "মার্কেটিং", value: "মার্কেটিং" },
    { label: "ফিন্যান্স ও ব্যাংকিং", value: "ফিন্যান্স ও ব্যাংকিং" },
  ],
  degree: [
    { label: "বিএ", value: "বিএ" },
    { label: "বিএসএস", value: "বিএসএস" },
    { label: "বিবিএস", value: "বিবিএস" }, 
    { label: "বিএসসি", value: "বিএসসি" }, 
  ],
  intermediate: [
    { label: "বিজ্ঞান", value: "বিজ্ঞান" },
    { label: "মানবিক", value: "মানবিক" },
    { label: "ব্যবসায় শিক্ষা", value: "ব্যবসায় শিক্ষা" }
  ]
};



export const getDepartmentsByProgram = (program) => {
  return departmentData[program] || [];
};

export default departmentData;

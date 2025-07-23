export function downloadAsTxt(data) {
    const { studentId, serviceId, paymentStatus, status: orderStatus, createdAt } = data;

    const content = `
📦 অর্ডার ডিটেইলস
অর্ডার আইডি: ${data._id}
অবস্থা: ${orderStatus}
পেমেন্ট: ${paymentStatus}
অর্ডার তারিখ: ${new Date(createdAt).toLocaleString('bn-BD')}

👨‍🎓 শিক্ষার্থীর তথ্য
নাম: ${studentId.username}
ফোন: ${studentId.phone}
ইনস্টিটিউট: ${studentId.instituteName}
সেশন: ${studentId.session} 
রেজিঃ নম্বর: ${studentId.registrationNumber}
রেজিঃ নম্বর: ${studentId.pin || "N/A"}
রোল: ${studentId.boardRoll}
রোল: ${studentId.classRoll}
ঠিকানা: ${studentId.address}
ব্লাড গ্রুপ: ${studentId.bloodGroup}

📝 সার্ভিস তথ্য
সার্ভিস টাইটেল: ${serviceId.title}
বর্ণনা: ${serviceId.description}
ফি: ${serviceId.fee} টাকা
প্রোগ্রাম: ${serviceId.program}
ডিপার্টমেন্ট: ${serviceId.department}
ক্লাস বর্ষ: ${serviceId.classYear}
সেশন: ${serviceId.session}
প্রয়োজনীয় ডকুমেন্ট: ${serviceId.requiredDocuments?.join(', ') || 'N/A'}

📌 আপডেট / মন্তব্য
----------------------------
এখানে নিজে থেকে তথ্য লিখুন...
----------------------------
`;


    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `order-${data.studentId.username || data._id}.txt`;
    a.click();

    URL.revokeObjectURL(url);
}

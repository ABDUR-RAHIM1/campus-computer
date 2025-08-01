export function downloadAsTxt(data) {
  const { _id, status, paymentStatus, createdAt, profileId, serviceId, reference } = data;

  const content = `
📦 অর্ডার ডিটেইলস
অর্ডার আইডি: ${_id}
অবস্থা: ${status}
পেমেন্ট: ${paymentStatus}
অর্ডার তারিখ: ${new Date(createdAt).toLocaleString('bn-BD')}

👨‍🎓 শিক্ষার্থীর তথ্য
নাম: ${profileId.studentName}
ইমেইল: ${profileId.email?.trim()}
ইনস্টিটিউট: ${profileId.instituteName}
প্রোগ্রাম: ${profileId.program}
বিভাগ: ${profileId.department}
বর্ষ: ${profileId.classYear}
সেশন: ${profileId.session}
রেজিঃ নম্বর: ${profileId.registrationNumber}
বোর্ড রোল: ${profileId.boardRoll}
ক্লাস রোল: ${profileId.classRoll}
পিন: ${profileId.pin || 'N/A'}
অভিভাবকের মোবাইল: ${profileId.guardianPhone}
ঠিকানা: ${profileId.address}
জন্ম তারিখ: ${new Date(profileId.birthDate).toLocaleDateString('bn-BD')}
রক্তের গ্রুপ: ${profileId.bloodGroup}
লিঙ্গ: ${profileId.gender}
ইমপ্রুভমেন্ট?: ${profileId.hasImprovement ? 'হ্যাঁ' : 'না'}
ইমপ্রুভমেন্ট বিষয়সমূহ: ${profileId.improvementSubjects?.join(', ') || 'N/A'}

👤 রেফারেন্স ইউজার
ইউজারনেম: ${reference.username}
ফোন: ${reference.phone}
ভূমিকা: ${reference.role}

📝 সার্ভিস তথ্য
সার্ভিস টাইটেল: ${serviceId.title}
বর্ণনা: ${serviceId.description}
প্রোগ্রাম: ${serviceId.program}
বিভাগ: ${data.department}
ক্লাস বর্ষ: ${serviceId.classYear}
সেশন: ${serviceId.session}
প্রয়োজনীয় ডকুমেন্ট: ${serviceId.requiredDocuments?.join(', ') || 'N/A'}

📌 মন্তব্য / আপডেট
----------------------------
এখানে নিজে থেকে তথ্য লিখুন...
----------------------------
`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `order-${profileId.studentName || _id}.txt`;
  a.click();

  URL.revokeObjectURL(url);
}

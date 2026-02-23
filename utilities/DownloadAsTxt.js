export function downloadAsTxt(data) {
  const {
    _id,
    status,
    paymentStatus,
    createdAt,
    profileId,
    serviceId,
    reference,
    collegeFee,
    subjectFee,
    chargeFee,
    totalFee,
    department: orderDepartment
  } = data;

  const content = `
========================================
       CAMPUS COMPUTER - ORDER INVOICE
========================================

📦 অর্ডারের সাধারণ তথ্য
----------------------------
অর্ডার আইডি    : ${_id}
অর্ডার স্ট্যাটাস : ${status === 'pending' ? 'পেন্ডিং' : status}
পেমেন্ট স্ট্যাটাস : ${paymentStatus === 'pending' ? 'বাকি' : paymentStatus}
অর্ডার তারিখ    : ${new Date(createdAt).toLocaleString('bn-BD')}

👨‍🎓 শিক্ষার্থীর বিস্তারিত তথ্য
----------------------------
নাম            : ${profileId?.studentName || 'N/A'}
রেজিঃ নম্বর     : ${profileId?.registrationNumber || 'N/A'}
সেশন           : ${profileId?.session || 'N/A'}
বিভাগ          : ${profileId?.department || 'N/A'}
প্রোগ্রাম         : ${profileId?.program || 'N/A'}
বর্ষ             : ${profileId?.classYear || 'N/A'}
ক্লাস রোল        : ${profileId?.classRoll || 'N/A'}
ঐচ্ছিক বিষয়     : ${profileId?.electiveSubject || 'N/A'}
মোবাইল নম্বর    : ${profileId?.contactNumber ? '0' + profileId.contactNumber : 'N/A'}
ইমপ্রুভমেন্ট আছে? : ${profileId?.hasImprovement ? 'হ্যাঁ' : 'না'}
ইমপ্রুভমেন্ট বিষয় : ${profileId?.improvementSubjects?.length > 0 ? profileId.improvementSubjects.join(', ') : 'নেই'}

👤 রেফারেন্স (অর্ডার দাতা)
----------------------------
ইউজারনেম       : ${reference?.username || 'N/A'}
ফোন            : ${reference?.phone || 'N/A'}
রোল            : ${reference?.role || 'user'}

📝 সার্ভিসের তথ্য
----------------------------
সার্ভিস টাইটেল   : ${serviceId?.title || 'N/A'}
বিভাগ (সার্ভিস) : ${orderDepartment || 'N/A'}
টাইপ           : ${serviceId?.type || 'N/A'}
প্রয়োজনীয় কাগজ  : ${serviceId?.requiredDocuments?.join(', ') || 'N/A'}

💰 পেমেন্ট ব্রেকডাউন
----------------------------
কলেজ ফি        : ৳ ${collegeFee || 0}
সাবজেক্ট ফি     : ৳ ${subjectFee || 0}
সার্ভিস চার্জ     : ৳ ${chargeFee || 0}
----------------------------
মোট ফি         : ৳ ${totalFee || 0}

📌 অতিরিক্ত নোট:
----------------------------
এখানে আপনার মন্তব্য লিখুন...

========================================
সংগৃহীত: ${new Date().toLocaleString('bn-BD')}
`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `Order_${profileId?.studentName?.replace(/\s+/g, '_') || _id}.txt`;
  document.body.appendChild(a); // কিছু ব্রাউজারের সেফটির জন্য অ্যাপেন্ড করা ভালো
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}
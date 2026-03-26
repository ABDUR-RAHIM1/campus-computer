export function downloadAsPDF(data) {
  const {
    _id, createdAt, paymentStatus,
    profileId, serviceId, reference,
    collegeFee, subjectFee, chargeFee, processingFee,
    testFeeTotal, billerCharge, cashOutCharge,
    calculatedTotal, orderType, department: orderDepartment
  } = data;

  const printWindow = window.open('', '_blank');

  const htmlContent = `
    <html>
      <head>
        <title>Invoice_${_id}</title>
        <style>
          body { font-family: 'Arial', sans-serif; padding: 20px; color: #333; line-height: 1.4; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
          .header h1 { margin: 0; font-size: 22px; color: #1a365d; }
          .section { margin-bottom: 15px; }
          .section-title { background: #f8fafc; padding: 5px 10px; font-weight: bold; border-left: 4px solid #2b6cb0; margin-bottom: 8px; font-size: 14px; border-bottom: 1px solid #e2e8f0; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; }
          .info-item { margin-bottom: 2px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 6px 10px; text-align: left; font-size: 12px; }
          th { background-color: #f1f5f9; }
          .total-box { margin-top: 15px; text-align: right; border-top: 2px solid #2b6cb0; padding-top: 5px; }
          .footer { margin-top: 30px; text-align: center; font-size: 9px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; }
          .badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; background: #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>CAMPUS COMPUTER - LALMONIRHAT</h1>
          <p style="margin:0; font-size:12px;">অনলাইন এডমিশন ও ফরম ফিলাপ সার্ভিস</p>
        </div>

        <div class="section">
          <div class="section-title">অর্ডার ও সার্ভিসের তথ্য</div>
          <div class="grid">
            <div class="info-item"><strong>অর্ডার আইডি:</strong> ${_id}</div>
            <div class="info-item"><strong>তারিখ:</strong> ${new Date(createdAt).toLocaleString('bn-BD')}</div>
            <div class="info-item"><strong>সার্ভিস নাম:</strong> ${serviceId?.serviceName || serviceId?.title || 'N/A'} </div>
            <div class="info-item"><strong>সার্ভিস ধরন:</strong> ${serviceId?.serviceName || serviceId?.type || 'N/A'} </div>
            <div class="info-item"><strong>সার্ভিস টাইপ:</strong> <span class="badge">${orderType === 'full_service' ? 'ফুল সার্ভিস' : 'কলেজ কপি'}</span></div>
            <div class="info-item"><strong>বিভাগ (অর্ডার):</strong> ${orderDepartment || 'N/A'}</div>
            <div class="info-item"><strong>পেমেন্ট স্ট্যাটাস:</strong> ${paymentStatus === 'paid' ? 'পরিশোধিত' : 'বাকি'}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">শিক্ষার্থীর বিস্তারিত তথ্য</div>
          <div class="grid">
            <div class="info-item"><strong>নাম:</strong> ${profileId?.studentName || 'N/A'}</div>
            <div class="info-item"><strong>রেজিঃ নম্বর:</strong> ${profileId?.registrationNumber || 'N/A'}</div>
            <div class="info-item"><strong>সেশন:</strong> ${profileId?.session || 'N/A'}</div>
            <div class="info-item"><strong>বিভাগ (প্রোফাইল):</strong> ${profileId?.department || 'N/A'}</div>
            <div class="info-item"><strong>রোল:</strong> ${profileId?.classRoll || 'N/A'}</div>
            <div class="info-item"><strong>মোবাইল:</strong> 0${profileId?.contactNumber || ''}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">রেফারেন্স তথ্য</div>
          <div class="grid" style="grid-template-columns: 1fr 1fr 1fr;">
            <div class="info-item"><strong>দাতা:</strong> ${reference?.username || 'N/A'}</div>
            <div class="info-item"><strong>ফোন:</strong> ${reference?.phone || 'N/A'}</div>
            <div class="info-item"><strong>আবেদনকারী:</strong> ${reference?.isOtherStudent ? "প্রতিনিধি/বন্ধু" : 'নিজের'}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">পেমেন্ট ব্রেকডাউন</div>
          <table>
            <thead>
              <tr>
                <th>বিবরণ</th>
                <th style="text-align: right;">পরিমাণ</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>কলেজ ফি (মূল ফি)</td><td style="text-align: right;">${collegeFee || 0} ৳</td></tr>
              ${subjectFee > 0 ? `<tr><td>সাবজেক্ট ফি</td><td style="text-align: right;">${subjectFee} ৳</td></tr>` : ''}
              <tr><td>প্রসেসিং ফি (অফিস)</td><td style="text-align: right;">${processingFee || 0} ৳</td></tr>
              ${testFeeTotal > 0 ? `<tr><td>টেস্ট পরীক্ষা জরিমানা</td><td style="text-align: right; color: red;">${testFeeTotal} ৳</td></tr>` : ''}
              
              <tr><td>সার্ভিস চার্জ (Campus Computer)</td><td style="text-align: right;">${chargeFee || 0} ৳</td></tr>
              <tr><td>বিলার চার্জ (Rocket/Bank)</td><td style="text-align: right;">${billerCharge || 0} ৳</td></tr>
              ${cashOutCharge > 0 ? `<tr><td>ক্যাশআউট চার্জ</td><td style="text-align: right;">${cashOutCharge} ৳</td></tr>` : ''}
            </tbody>
          </table>
        </div>

        <div class="total-box">
          <h3 style="margin:0;">সর্বমোট পেমেন্ট: ${calculatedTotal || 0} ৳</h3>
          <p style="font-size: 11px; margin:2px 0;">(কথায়: ${calculatedTotal || 0} টাকা মাত্র)</p>
        </div>

        <div class="footer">
          <p>ক্যাম্পাস কম্পিউটার, লালমনিরহাট সরকারি কলেজ মোড়। এটি একটি সিস্টেম জেনারেটেড ইনভয়েস।</p>
          <p>ডাউনলোড সময়: ${new Date().toLocaleString('bn-BD')}</p>
        </div>

        <script>
          window.onload = function() { 
            window.print(); 
            window.onafterprint = function() { window.close(); };
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
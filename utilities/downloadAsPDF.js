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
          body { font-family: 'Arial', sans-serif; padding: 40px; color: #333; line-height: 1.4; background: #f1f5f9; }
          .invoice-card { max-width: 850px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
          .header { text-align: center; border-bottom: 2px solid #1e293b; padding-bottom: 15px; margin-bottom: 25px; }
          .header h1 { margin: 0; font-size: 24px; color: #1e3a8a; text-transform: uppercase; }
          .header p { margin: 5px 0 0; font-size: 13px; color: #64748b; font-weight: bold; }
          
          .section { margin-bottom: 20px; }
          .section-title { background: #f1f5f9; padding: 6px 12px; font-weight: bold; border-left: 5px solid #2563eb; margin-bottom: 10px; font-size: 14px; color: #1e293b; }
          
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 13px; }
          .info-item { margin-bottom: 4px; }
          .badge { font-size: 11px; padding: 2px 8px; border-radius: 12px; background: #dbeafe; color: #1e40af; font-weight: bold; }
          
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #e2e8f0; padding: 10px 12px; text-align: left; font-size: 13px; }
          th { background-color: #f8fafc; color: #475569; font-weight: bold; }
          
          .total-box { margin-top: 20px; text-align: right; border-top: 3px double #2563eb; padding-top: 10px; }
          .total-amount { font-size: 20px; color: #1e3a8a; font-weight: 900; margin: 0; }
          
          .footer { margin-top: 40px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; }
          
          /* বাটন স্টাইল */
          .action-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; max-width: 850px; margin-left: auto; margin-right: auto; }
          .print-btn { background: #2563eb; color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.4); }
          .print-btn:hover { background: #1d4ed8; }

          @media print {
            body { background: white; padding: 0; }
            .invoice-card { box-shadow: none; border: none; max-width: 100%; padding: 0; }
            .action-bar { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="action-bar">
            <div style="font-size: 12px; color: #64748b;">ইনভয়েসটি চেক করে প্রিন্ট বাটনে ক্লিক করুন।</div>
            <button class="print-btn" onclick="window.print()">Print / Save PDF</button>
        </div>

        <div class="invoice-card">
          <div class="header">
            <h1>CAMPUS COMPUTER - LALMONIRHAT</h1>
            <p>অনলাইন এডমিশন ও ফরম ফিলাপ সার্ভিস সেন্টার</p>
          </div>

          <div class="section">
            <div class="section-title">অর্ডার ও সার্ভিসের তথ্য</div>
            <div class="grid">
              <div class="info-item"><strong>অর্ডার আইডি:</strong> <span style="font-family: monospace;">${_id}</span></div>
              <div class="info-item"><strong>তারিখ:</strong> ${new Date(createdAt).toLocaleString('bn-BD')}</div>
              <div class="info-item"><strong>সার্ভিস নাম:</strong> ${serviceId?.serviceName || serviceId?.title || 'N/A'}</div>
              <div class="info-item"><strong>সার্ভিস ধরন:</strong> ${serviceId?.type || 'N/A'}</div>
              <div class="info-item"><strong>আবেদনের ধরন:</strong> <span class="badge">${orderType === 'full_service' ? 'ফুল সার্ভিস' : 'কলেজ কপি'}</span></div>
              <div class="info-item"><strong>বিভাগ (অর্ডার):</strong> ${orderDepartment || 'N/A'}</div>
              <div class="info-item"><strong>পেমেন্ট স্ট্যাটাস:</strong> <span style="color: ${paymentStatus === 'paid' ? 'green' : 'red'}; font-weight:bold;">${paymentStatus === 'paid' ? 'পরিশোধিত' : 'যাচাই করা হচ্ছে'}</span></div>
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
              <div class="info-item"><strong>সম্পর্ক:</strong> ${reference?.isOtherStudent ? "প্রতিনিধি/বন্ধু" : 'নিজের'}</div>
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
                ${testFeeTotal > 0 ? `<tr><td>টেস্ট পরীক্ষা জরিমানা</td><td style="text-align: right; color: red; font-weight: bold;">${testFeeTotal} ৳</td></tr>` : ''}
                <tr><td>সার্ভিস চার্জ (Campus Computer)</td><td style="text-align: right;">${chargeFee || 0} ৳</td></tr>
                <tr><td>বিলার চার্জ (Rocket/Bank)</td><td style="text-align: right;">${billerCharge || 0} ৳</td></tr>
                ${cashOutCharge > 0 ? `<tr><td>ক্যাশআউট চার্জ</td><td style="text-align: right;">${cashOutCharge} ৳</td></tr>` : ''}
              </tbody>
            </table>
          </div>

          <div class="total-box">
            <p style="margin:0; font-size: 12px; color: #64748b;">সব মিলিয়ে পরিশোধযোগ্য মোট টাকা</p>
            <h3 class="total-amount">৳ ${calculatedTotal || 0}/-</h3>
            <p style="font-size: 11px; margin:2px 0; font-style: italic;">(কথায়: ${calculatedTotal || 0} টাকা মাত্র)</p>
          </div>

          <div class="footer">
            <p>ক্যাম্পাস কম্পিউটার, লালমনিরহাট সরকারি কলেজ সংলগ্ন, কলেজ বাজার। এটি একটি সিস্টেম জেনারেটেড ডিজিটাল ইনভয়েস।</p>
            <p>প্রিন্ট সময়: ${new Date().toLocaleString('bn-BD')}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
import { rocketBillerChargeCalculate } from "@/app/(profile)/profile/create-order/CashoutChargeCalculator";

export const feeCalculation = (collegeFee = 0, subjectFee = 0, processingFee = 0, chargeFee = 0) => {

    // : subtotal
    const subTotal = Number(collegeFee) + Number(subjectFee) + Number(processingFee) + Number(chargeFee);

    // : rocketBillerCharge (1000 টাকার জন্য 15 টাকার proportion, মানে 1.5%)
    const rocketBillerCharge = rocketBillerChargeCalculate(subTotal);

    // : total including rocketBillerCharge
    const totalFee = subTotal + rocketBillerCharge;

    // Step 4: return all together
    return {
        subTotal,
        rocketBillerCharge,
        totalFee
    };
};
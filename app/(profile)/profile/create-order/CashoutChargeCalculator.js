
export const CashoutChargeCalculator = (amount) => {

    const chargeEveryTk = 0.02;
    const totalCharged = Math.round(Number(amount) * chargeEveryTk)
    return totalCharged

}
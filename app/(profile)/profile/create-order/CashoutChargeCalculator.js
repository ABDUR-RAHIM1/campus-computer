
export const CashoutChargeCalculator = (amount) => {

    const chargeEveryTk = 0.02;
    const totalCharged = Math.round(Number(amount) * chargeEveryTk)
    return totalCharged

};


export const rocketBillerChargeCalculate = (baseAmount) => {
    return Math.ceil((baseAmount / 1000) * 15);
}



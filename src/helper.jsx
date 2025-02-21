function buildGetRequest(url, accessToken, userId, paymentMethod, startDate, endDate) {
    const params = new URLSearchParams();
    if (isParamAvailable(accessToken)) {
        params.append('accessToken', accessToken);
    }
    if (isParamAvailable(userId)) {
        params.append('userId', userId);
    }
    if (isParamAvailable(paymentMethod)) {
        params.append('paymentMethod', paymentMethod);
    }
    if (isParamAvailable(startDate)) {
        params.append('startDate', startDate);
    }
    if (isParamAvailable(endDate)) {
        params.append('endDate', endDate);
    }

    return `${url}?${params.toString()}`;
}

function buildDeleteRequest(url, userId, date, amount) {
    const params = new URLSearchParams();
    if (isParamAvailable(userId)) {
        params.append('userId', userId);
    }
    if (isParamAvailable(date)) {
        params.append('date', date);
    }
    if (isParamAvailable(amount)) {
        params.append('amount', amount);
    }

    return `${url}?${params.toString()}`;
}

function formatAsUSCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
}

function calculateExpenses(expenseRecords) {
    let totalExpenses = 0;
    for (let i = 0; i < expenseRecords.length; ++i) {
        totalExpenses += expenseRecords[i]["amount"];
    }
    return totalExpenses;
}


function isParamAvailable(param) {
    return param !== null && param !== undefined && param !== '';
}

export { buildGetRequest, buildDeleteRequest, formatAsUSCurrency, calculateExpenses };
// src/utils/currency.js
export const getCurrencySymbol = (currency) => {
    switch (currency) {
        case 'USD':
            return '$';
        case 'EUR':
            return '€';
        case 'GBP':
            return '£';
        case 'JPY':
            return '¥';
        case 'AUD':
            return 'A$';
        case 'CAD':
            return 'C$';
        case 'CHF':
            return 'Fr.';
        case 'CNY':
            return '¥';
        case 'HKD':
            return 'HK$';
        case 'NZD':
            return 'NZ$';
        case 'INR':
            return '₹';
        default:
            return '';
    }
};
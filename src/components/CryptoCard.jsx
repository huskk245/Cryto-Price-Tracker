import React from 'react';
import { getCurrencySymbol } from '../utils/currency';

const CryptoCard = ({ crypto, currentCurrency, onCardClick }) => {
    return (
        <div
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => onCardClick(crypto)}
        >
            <h3 className="text-lg font-bold text-gray-800">{crypto.name}</h3>
            <p className="text-gray-500">{crypto.symbol.toUpperCase()}</p>
            <p className="text-3xl font-bold text-blue-600">
                {getCurrencySymbol(currentCurrency)}{crypto.current_price.toFixed(2)}
            </p>
            <p
                className={`text-lg font-bold ${crypto.price_change_percentage_24h >= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
            >
                {crypto.price_change_percentage_24h.toFixed(2)}%
            </p>
        </div>
    );
};

export default CryptoCard;
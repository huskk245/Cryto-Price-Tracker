import React from 'react';
import CryptoCard from './CryptoCard';

const CryptoList = ({ cryptos }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cryptos.map((crypto) => (
                <CryptoCard key={crypto.id} crypto={crypto} />
            ))}
        </div>
    );
};

export default CryptoList;
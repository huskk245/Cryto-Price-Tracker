// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import CryptoCard from '../components/CryptoCard';
import SearchBar from '../components/SearchBar';
import PriceChartModal from '../components/PriceChartModal';
import CurrencyDropdown from '../components/CurrencyDropdown';
import { getCurrencySymbol } from '../utils/currency';

const HomePage = () => {
    const [cryptos, setCryptos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [priceHistory, setPriceHistory] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCurrency, setCurrentCurrency] = useState('USD');

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
                );
                const data = await response.json();
                setCryptos(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
                setIsLoading(false);
            }
        };

        fetchCryptoData();
    }, [currentCurrency]);

    const filteredCryptos = cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCardClick = (crypto) => {
        setSelectedCrypto(crypto);
        fetchPriceHistory(crypto.id);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedCrypto(null);
    };

    const fetchPriceHistory = async (cryptoId) => {
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=${currentCurrency}&days=7`
            );
            const data = await response.json();
            setPriceHistory(data.prices.map(([timestamp, price]) => price));
        } catch (error) {
            console.error('Error fetching price history:', error);
        }
    };

    const handleCurrencyChange = (currency) => {
        setCurrentCurrency(currency);
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-5xl font-bold text-white">Crypto Price Tracker</h1>
                <CurrencyDropdown currentCurrency={currentCurrency} onCurrencyChange={handleCurrencyChange} />
            </div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {isLoading ? (
                <div className="text-center text-gray-500 text-lg">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCryptos.map((crypto) => (
                        <CryptoCard
                            key={crypto.id}
                            crypto={crypto}
                            currentCurrency={currentCurrency}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </div>
            )}

            {showModal && selectedCrypto && (
                <PriceChartModal
                    crypto={selectedCrypto}
                    priceHistory={priceHistory}
                    onClose={handleModalClose}
                    currentCurrency={currentCurrency}
                />
            )}
        </div>
    );
};

export default HomePage;
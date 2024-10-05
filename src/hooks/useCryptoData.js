import { useState, useEffect } from 'react';
import axios from 'axios';

const useCryptoData = () => {
    const [cryptos, setCryptos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
                );
                setCryptos(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
                setIsLoading(false);
            }
        };

        fetchCryptoData();
    }, []);

    return { cryptos, isLoading };
};

export default useCryptoData;
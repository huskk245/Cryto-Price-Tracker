import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js/auto';

const PriceChartModal = ({ crypto, priceHistory, onClose }) => {
    const chartData = {
        labels: Array.from({ length: priceHistory.length }, (_, i) => i + 1),
        datasets: [
            {
                label: `${crypto.name} Price`,
                data: priceHistory,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `${crypto.name} Price Chart`,
            },
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Days',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Price (USD)',
                },
            },
        },
    };

    const handleModalClick = (e) => {
        // Close the modal only if the background is clicked
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleCloseClick = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleModalClick}>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end">
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={handleCloseClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="mt-4">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default PriceChartModal;
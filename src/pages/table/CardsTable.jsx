import React, { useState, useEffect } from 'react';
import {
    BiCreditCard,
    BiTime,
    BiTrash,
    BiLoaderAlt,
    BiChevronRight,
    BiCalendar,
    BiUser,
    BiBlanket,
    BiExpand,
    BiCollapse,
    BiArrowBack,
} from 'react-icons/bi';
import axios from 'axios';
import { cardApi } from '../../constants/services';
import { useNavigate } from 'react-router-dom';

const CardsTable = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isCompact, setIsCompact] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        fetchCards();
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleResize = () => {
        setIsCompact(window.innerWidth < 768);
    };

    const fetchCards = async () => {
        try {
            const response = await axios.get(cardApi);
            setCards(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch card data');
            setLoading(false);
        }
    };

    const formatCardNumber = (number) => `${number.slice(0, 4)} •••• •••• ${number.slice(-4)}`;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <BiLoaderAlt className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-center text-red-500">
                    <BiLoaderAlt className="w-6 h-6 mr-2" />
                    {error}
                </div>
            </div>
        );
    }
    const handleCardDelete = item => {
        try {
            axios.delete(`${cardApi}${item}`)
            window.location.reload()
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br ">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="group mb-6 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 
                             transition-all duration-200 rounded-lg hover:bg-white/50 backdrop-blur-sm"
                >
                    <BiArrowBack className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span className="font-medium">Назад</span>
                </button>
                <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
                    <div className={`grid gap-4 md:space-y-6 md:block
                        ${isCompact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-1'}`}>
                        {cards.map((card, index) => (
                            <div
                                key={card.id}
                                className={`
                                    relative md:pl-20 transition-all duration-300 ease-in-out
                                    ${selectedCard === card.id ? 'scale-102 -translate-y-1' : ''}
                                `}
                                onClick={() => setSelectedCard(card.id)}
                                style={{
                                    animationDelay: `${index * 150}ms`,
                                    animation: 'slideIn 0.5s ease-out forwards'
                                }}
                            >
                                {/* Timeline dot - visible only on desktop */}
                                <div className={`
                                    absolute left-7 w-3 h-3 transform -translate-x-1/2 rounded-full hidden md:block
                                    ${selectedCard === card.id ? 'bg-blue-500 ring-4 ring-blue-100' : 'bg-gray-400 ring-4 ring-gray-100'}
                                    transition-colors duration-200
                                `} />

                                {/* Card content with responsive layout */}
                                <div className={`
                                    group relative bg-white rounded-lg shadow-sm border
                                    hover:shadow-lg transition-all duration-200
                                    ${selectedCard === card.id ? 'border-blue-200 shadow-md' : 'border-gray-200 hover:border-blue-100'}
                                `}>
                                    <div className="p-4 md:p-6">
                                        {/* Main card information */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-blue-50 p-2 md:p-3 rounded-full">
                                                    <BiCreditCard className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {formatCardNumber(card.cardNumber)}
                                                    </p>
                                                    <div className="flex items-center mt-1 text-sm text-gray-500">
                                                        <BiUser className="w-4 h-4 mr-1" />
                                                        {card.cardHolder}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2 md:space-x-4">
                                                <button
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                                                    onClick={(e) => handleCardDelete(card.id)}
                                                >
                                                    <BiTrash className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Responsive additional details grid */}
                                        <div className={`grid gap-3 pt-4 border-t border-gray-100
                                            ${isCompact ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'}`}>
                                            <div className="flex items-center space-x-2">
                                                <BiCalendar className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">
                                                    Срок: {card?.expiryDate ? card.expiryDate : '09/25'}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <BiBlanket className="w-4 h-4 text-gray-400" />
                                                <a href={card?.url} className="text-sm text-gray-600">
                                                    {card?.url}
                                                </a>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <BiTime className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">
                                                    Added: {card.data || '09.02.2025, 06:03'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Responsive status bar */}

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Responsive Empty State */}
                {cards.length === 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-12 text-center">
                        <BiCreditCard className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods found</h3>
                        <p className="text-gray-500 mb-6">Add your first payment method to get started</p>
                        <button onClick={() => navigate('/')} className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                            Add Payment Method
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: ${window.innerWidth < 768 ? 'translateY(20px)' : 'translateX(-20px)'};
                    }
                    to {
                        opacity: 1;
                        transform: translate(0);
                    }
                }

                @media (max-width: 768px) {
                    .scale-102 {
                        transform: scale(1.02);
                    }
                }
            `}</style>
        </div>
    );
};

export default CardsTable;
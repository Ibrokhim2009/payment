import React, { useState } from 'react';
import CardsTable from './CardsTable';
import PhoneTable from './PhoneTable';

function Tables() {
    const [activeTab, setActiveTab] = useState('cards');

    return (
        <div className="w-[100%] mx-auto px-4 py-8">
            <div className="flex justify-center mb-8">
                <div className="inline-flex p-1 bg-gray-100 rounded-xl shadow-inner">
                    {[
                        { id: 'cards', label: 'Cards Overview' },
                        { id: 'phone', label: 'Phone Details' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-6 py-3 rounded-lg text-sm font-semibold transition-colors 
                                ${activeTab === tab.id ? 'text-white' : 'text-gray-600 hover:text-gray-900'}`}
                            whileTap={{ scale: 0.97 }}
                        >
                            {activeTab === tab.id && (
                                <div
                                    className="absolute inset-0 bg-blue-600 rounded-lg shadow-lg"
                                />
                            )}
                            <span className="relative z-10 inline-flex items-center">
                                {tab.id === 'cards' ? (
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                        />
                                    </svg>
                                )}
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Container */}

            {activeTab === 'cards' ? (
                <CardsTable />
            ) : (
                <PhoneTable />
            )}
        </div>
    );
}

export default Tables;
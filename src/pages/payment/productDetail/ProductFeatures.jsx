import React, { useState } from 'react';
import {
    BiStar,
    BiUserCircle,
    BiChevronDown,
    BiCheck,
    BiInfoCircle
} from 'react-icons/bi';

const ProductFeatures = () => {
    const [activeTab, setActiveTab] = useState('details');
    const features = [
        { key: "Напряжение", value: "220 В" },
        { key: "Мощность", value: "1500 Вт" },
        { key: "Объем бака", value: "60 литров" },
        { key: "Бренд", value: "NUMBER ONE" },
        { key: "Страна бренда", value: "Россия" }
    ];

    const reviews = [
        {
            author: "Александр М.",
            rating: 5,
            date: "15.02.2024",
            text: "Отличное качество сборки, работает тихо и эффективно. Рекомендую!"
        },
        {
            author: "Елена В.",
            rating: 4,
            date: "10.02.2024",
            text: "Хороший аппарат, но немного громоздкий. В целом довольна покупкой."
        },
        {
            author: "Кобилов. М",
            rating: 2,
            date: "10.02.2025",
            text: "Почему то он ко мне пришел в неокуратном виде"
        }
    ];

    return (
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden">
            {/* Tabs Navigation */}
            <div className="flex">
                {['details', 'description', 'reviews'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-4 px-6 text-sm font-medium transition-all relative
                            ${activeTab === tab
                                ? 'text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
                        )}
                    </button>
                ))}
            </div>

            {/* Details Tab */}
            <div className={`p-6 ${activeTab !== 'details' && 'hidden'}`}>
                <div className="space-y-3  pt-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b border-gray-300 transition-colors duration-200"
                        >
                            <span className="text-gray-700">{feature.key}</span>
                            <span className="font-medium text-gray-900">{feature.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Description Tab */}
            <div className={`p-6 ${activeTab !== 'description' && 'hidden'}`}>
                <div className="text-gray-700 space-y-6">
                    <p className="leading-relaxed md:text-md lg:text-lg border-b border-gray-300 pb-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Autem ut consequuntur soluta error nobis reprehenderit quibusdam ducimus
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-gray-900 border-l-4 border-blue-500 pl-3">
                                Преимущества
                            </h4>
                            <ul className="space-y-2">
                                {['Высокая мощность', 'Экономичность', 'Простота управления'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-800">
                                        <BiCheck className="text-blue-500 w-5 h-5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-gray-900 border-l-4 border-green-500 pl-3">
                                Применение
                            </h4>
                            <ul className="space-y-2">
                                {['Бытовое использование', 'Профессиональное применение', 'Длительная эксплуатация'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-800">
                                        <BiCheck className="text-green-500 w-5 h-5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>



            {/* Reviews Tab */}
            <div className={`p-6 ${activeTab !== 'reviews' && 'hidden'}`}>
                <div className="space-y-6">
                    {reviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                            <div className="flex items-start gap-4">
                                <BiUserCircle className="w-12 h-12 text-gray-500 sm:flex hidden" />
                                <div className="flex-1">
                                    <BiUserCircle className="w-12 h-12 text-gray-500 sm:hidden flex" />
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-medium text-gray-900">{review.author}</div>
                                            <div className="text-sm text-gray-500">{review.date}</div>
                                        </div>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <BiStar
                                                    key={i}
                                                    className={`w-5 h-5 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mt-2">{review.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductFeatures;
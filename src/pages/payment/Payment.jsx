import React, { useContext, useEffect, useState } from 'react';
import { BiCheck, BiChevronLeft, BiCreditCard } from 'react-icons/bi';
import { CgSmartphone } from 'react-icons/cg';
import ProductDetail from './productDetail/ProductDetail';
import axios from 'axios';
import { cardApi, phoneApi } from '../../constants/services';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../App';
import { nanoid } from 'nanoid';

const Payment = () => {
    const { cardArr, setCardArr, phoneArr, setPhoneArr } = useContext(Context)
    const [isCardMode, setIsCardMode] = useState(true);
    const [expiryDate, setExpiryDate] = useState('');
    const [cardError, setCardError] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [isValidCard, setIsValidCard] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const switchPaymentMode = (mode) => {
        setIsCardMode(mode === 'card');
    };

    const handleExpiryDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        setExpiryDate(value);
    };
    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.slice(0, 16);

        let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();

        const digits = value.split('').reverse().map(Number);
        const sum = digits.reduce((acc, digit, index) => {
            if (index % 2 === 1) {
                let doubled = digit * 2;
                return acc + (doubled > 9 ? doubled - 9 : doubled);
            }
            return acc + digit;
        }, 0);
        if (value.length === 16 && sum % 10 === 0) {
            setCardNumber(formattedValue);
            setCardError('');
        } else {
            setCardNumber('');
            setCardError('Неверный номер карты');
        }
        setIsValidCard(sum % 10 === 0 && value.length === 16);
    };



    const now = new Date()
    const dateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    const handleFormSubmit = (e) => {
        e.preventDefault();
        try {
            const cardObj = {
                cardNumber: cardNumber,
                cardHolder: name,
                expiryDate: expiryDate,
                url: `${cardApi}${name}`,
                data: dateTime,
                id: nanoid()
            }
            setCardArr([...cardArr, cardObj])
            alert('Покубка прошла успешно')
        }
        catch (err) {
            console.log(err)
        }
    };
    const handlePhoneSubmit = e => {
        e.preventDefault()
        const forma = new FormData(e.target)
        const { tel, name } = Object.fromEntries(forma.entries())
        const phoneObject = {
            tel,
            name,
            data: dateTime,
            id: nanoid()
        }
        try {
            setPhoneArr([...phoneArr, phoneObject])
            alert('Заказ принят')
        }
        catch (err) {
            console.log(err)
        }
    }
    console.log(cardArr)
    return (
        <div className="min-h-screen lg:flex-row flex-col max-w-[1340px] m-auto flex items-start justify-center bg-gradient-to-b">
            <ProductDetail />
            <div className="mx-auto lg:max-w-[600px] px-4 sm:px-6 w-full lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h2>
                    <p className="text-gray-600">Choose your payment method below</p>
                </div>

                <div className="flex space-x-4 mb-8">
                    <button
                        className={`flex-1 p-4 rounded-lg border-2 transition-all ${isCardMode ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => switchPaymentMode('card')}
                    >
                        <div className="flex items-center justify-center">
                            <BiCreditCard className={`w-6 h-6 ${isCardMode ? 'text-blue-500' : 'text-gray-400'}`} />
                            <span className={`ml-2 font-medium ${isCardMode ? 'text-blue-500' : 'text-gray-500'}`}>Credit Card</span>
                        </div>
                    </button>
                    <button
                        className={`flex-1 p-4 rounded-lg border-2 transition-all ${!isCardMode ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => switchPaymentMode('phone')}
                    >
                        <div className="flex items-center justify-center">
                            <CgSmartphone className={`w-6 h-6 ${!isCardMode ? 'text-blue-500' : 'text-gray-400'}`} />
                            <span className={`ml-2 font-medium ${!isCardMode ? 'text-blue-500' : 'text-gray-500'}`}>Phone</span>
                        </div>
                    </button>
                </div>
                {isCardMode && (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div className='flex items-start gap-3'>
                            <div className='w-[100%] flex-2'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                <input
                                    type="tel"
                                    name="card_number"
                                    placeholder="1234 5678 9012 3456"
                                    required
                                    maxLength="19"
                                    onInput={handleCardNumberChange}
                                    className="w-full px-4 py-3 outline-0 border rounded-lg focus:ring-2 transition border-gray-300 focus:ring-blue-500"
                                />

                                <span className={`text-red-500 ${cardError && 'block'}`}>{cardError}</span>
                            </div>

                            <div className='flex-1'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                <input
                                    type="text"
                                    name='expiry_data'
                                    value={expiryDate}
                                    onChange={handleExpiryDateChange}
                                    required
                                    placeholder="MM/YY"
                                    className="w-full px-4 py-3 outline-0 border rounded-lg focus:ring-2 transition border-gray-300 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 outline-0 border rounded-lg focus:ring-2 transition border-gray-300 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type='submit'
                            className="w-full mt-8 py-3 px-4 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center"
                        >
                            Pay
                        </button>
                    </form>
                )}

                {!isCardMode && (
                    <form onSubmit={handlePhoneSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="text"
                                placeholder="+998 (**) ***-**-**"
                                name='tel'
                                required
                                className="w-full px-4 py-3 outline-0 border rounded-lg focus:ring-2 transition border-gray-300 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                            <input
                                type="text"
                                placeholder="ФИО"
                                name='name'
                                required
                                className="w-full px-4 py-3 outline-0 border rounded-lg focus:ring-2 transition border-gray-300 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type='submit'
                            className="w-full mt-8 py-3 px-4 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center"
                        >
                            Sent
                        </button>
                    </form>
                )}

                <button
                    onClick={() => navigate('/tables')}
                    className="w-full mt-6 py-3 px-4 rounded-lg text-white font-semibold bg-gray-700 hover:bg-gray-800 transition flex items-center justify-center"
                >
                    Исптория запросов
                </button>
            </div>
        </div>

    );
};

export default Payment;

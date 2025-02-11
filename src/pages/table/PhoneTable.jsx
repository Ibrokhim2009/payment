import React, { useState, useEffect, useContext } from 'react';
import {
    BiPhone,
    BiLoaderAlt,
    BiTrash,
    BiUser,
    BiArrowBack,
} from 'react-icons/bi';
import axios from 'axios';
import { phoneApi } from '../../constants/services';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../App';

const PhoneTable = () => {
    const { phoneArr, setPhoneArr } = useContext(Context)
    const [selectedContact, setSelectedContact] = useState(null);
    const [viewMode, setViewMode] = useState('list');
    const navigate = useNavigate()
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleResize = () => {
        setViewMode(window.innerWidth < 768 ? 'grid' : 'list');
    };
    const formatPhoneNumber = (number) => {
        return number.replace(/(\+\d{3})(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4');
    };
    const handlePhoneElementDelete = (id) => {
        try {
            setPhoneArr(prevPhones => prevPhones.filter(phone => phone.id !== id));
        } catch (err) {
            console.error("Ошибка при удалении номера:", err);
        }
    };

    return (
        <div className="min-h-screen">
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
                    {viewMode === 'list' && (
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-blue-200" />
                    )}

                    <div className={`
                        ${viewMode === 'grid'
                            ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                            : 'space-y-6'}
                    `}>
                        {phoneArr?.map((contact, index) => (
                            <div
                                key={contact.id}
                                className={`
                                    ${viewMode === 'list' ? 'pl-20' : 'pl-0'}
                                    relative transition-all duration-300 ease-in-out
                                    ${selectedContact === contact.id ? 'scale-102' : ''}
                                `}
                                onClick={() => setSelectedContact(contact.id)}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: `${viewMode === 'grid' ? 'fadeIn' : 'slideIn'} 0.5s ease-out forwards`
                                }}
                            >
                                {viewMode === 'list' && (
                                    <div className={`
                                        absolute left-7 w-3 h-3 transform -translate-x-1/2 rounded-full
                                        ${selectedContact === contact.id
                                            ? 'bg-blue-500 ring-4 ring-blue-100'
                                            : 'bg-gray-400 ring-4 ring-gray-100'}
                                        transition-colors duration-200
                                    `} />
                                )}

                                <div className={`
                                    group relative bg-white rounded-lg shadow-sm border
                                    hover:shadow-lg transition-all duration-200
                                    ${selectedContact === contact.id
                                        ? 'border-blue-200 shadow-md'
                                        : 'border-gray-200 hover:border-blue-100'}
                                `}>
                                    <div className="p-4 md:p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full">
                                                    <BiUser className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{contact.name}</p>
                                                    <p className="text-sm text-gray-500">{formatPhoneNumber(contact.tel)}</p>
                                                </div>
                                            </div>
                                            <button
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                                                onClick={(e) => handlePhoneElementDelete(contact.id)}
                                            >
                                                <BiTrash className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="text-sm text-gray-500">
                                                Added:   {new Date(contact.data).toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-400 mt-1">
                                                ID: {contact.id}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {phoneArr.length === 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
                        <BiPhone className="w-12 h-12 md:w-16 md:h-16 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
                        <p className="text-gray-500 mb-6">Add your first contact to get started</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                            Add Contact
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhoneTable;
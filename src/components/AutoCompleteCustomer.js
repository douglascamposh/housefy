import React, { useState, useEffect, useRef } from 'react';
import { useGetCustomersQuery } from '@/redux/services/propertiesApi';

const AutoCompleteCustomer = ({ onSelect }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const inputRef = useRef(null);
    const { data, error, isLoading } = useGetCustomersQuery(input || "");
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp' && activeSuggestion > 0) {
            setActiveSuggestion(activeSuggestion - 1);
        } else if (e.key === 'ArrowDown' && activeSuggestion < suggestions.length - 1) {
            setActiveSuggestion(activeSuggestion + 1);
        } else if (e.key === 'Enter') {
            if (suggestions[activeSuggestion]) {
                handleSelect(suggestions[activeSuggestion]);
            }
        }
    };
    const handleClearSelection = () => {
        setInput('');
        onSelect(null);
        setSuggestions([]);
        setShowSuggestion(false);
    };
    useEffect(() => {
        setShowSuggestion(input !== '' && !isLoading && data && data.length > 0);
        if (input && data) {
            const filteredSuggestions = data.filter(suggestion =>
                suggestion.name.toLowerCase().includes(input.toLowerCase()) ||
                suggestion.lastName.toLowerCase().includes(input.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setActiveSuggestion(0);
        } else {
            setSuggestions([]);
            setActiveSuggestion(0);
        }
    }, [input, data, isLoading]);

    const handleSelect = (value) => {
        setInput(value.name + " " + value.lastName);
        onSelect(value);
        setSuggestions([]);
        setShowSuggestion(false);
    };
    const getInitials = (name) => {
        return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
    };
    return (
        <div className="relative inline-block w-full">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Nombre, apellido o Nro de telefono"
                    className="py-3 px-4 bg-gray-200 w-full outline-none rounded-lg border focus:border-blue-400"
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
                {input && (
                    <button
                        onClick={handleClearSelection}
                        className="absolute right-2 p-2 text-red-500 rounded-full hover:bg-gray-300"
                    >
                        X
                    </button>
                )}
            </div>
            {showSuggestion && suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-2 border border-gray-300 bg-white rounded-b-lg">
                    {suggestions.map((suggestion, index) => (
                        <li key={index}
                            className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 ${activeSuggestion === index ? 'bg-gray-100' : ''}`}
                            onClick={() => handleSelect(suggestion)}>
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-2">
                                    {getInitials(suggestion.name)}
                                </div>
                                {suggestion.name + " " + suggestion.lastName}
                            </div>
                            {activeSuggestion === index && <span>&#10004;</span>}
                        </li>
                    ))}
                </ul>
            )}
            {error&& (
                <div className="absolute left-0 right-0 mt-2 border border-gray-300 bg-white rounded-b-lg p-2 text-red-600">
                    Hubo un error
                </div>
            )}
            {isLoading && (
                <div className="absolute left-0 right-0 mt-2 border border-gray-300 bg-white rounded-b-lg p-2 text-gray-600">
                    Cargando...
                </div>
            )}
        </div>
    );
};

export default AutoCompleteCustomer;

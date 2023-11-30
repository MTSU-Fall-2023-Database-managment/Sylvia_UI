import React, { useState } from 'react';
import axios from 'axios';

function CallAlphaVantageApi({ onBackToMain }) {
    const [selectedFunction, setSelectedFunction] = useState('');
    const [symbols, setSymbols] = useState('');
    const [apiResponse, setApiResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFunctionChange = (event) => {
        setSelectedFunction(event.target.value);
    };

    const handleSymbolChange = (event) => {
        setSymbols(event.target.value);
    };

    const callApi = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('/callAlphaVantage', { function: selectedFunction, symbols: symbols.split(',') });
            setApiResponse(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error calling AlphaVantage API', error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Call AlphaVantage API</h2>
            <div>
                <label>
                    Pick a function:
                    <select value={selectedFunction} onChange={handleFunctionChange}>
                        <option value="">Select...</option>
                        <option value="TIME_SERIES_INTRADAY">TIME_SERIES_INTRADAY</option>
                        <option value="TIME_SERIES_DAILY">TIME_SERIES_DAILY</option>
                        <option value="TIME_SERIES_WEEKLY">TIME_SERIES_WEEKLY</option>
                        <option value="TIME_SERIES_MONTHLY">TIME_SERIES_MONTHLY</option>
                    </select>
                </label>
                <label>
                    Enter Symbol(s):
                    <input type="text" value={symbols} onChange={handleSymbolChange} placeholder="e.g., AAPL,MSFT" />
                </label>
                <button onClick={callApi} disabled={!selectedFunction || !symbols}>Call API</button>
            </div>
            {isLoading && <p>Loading...</p>}
            {apiResponse && <div><h3>Response:</h3><pre>{JSON.stringify(apiResponse, null, 2)}</pre></div>}
            <button onClick={onBackToMain}>Main Menu</button>
        </div>
    );
}

export default CallAlphaVantageApi;

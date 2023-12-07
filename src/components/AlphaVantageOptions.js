import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AlphaVantageOptions.css';

function AlphaVantageOptions({ onBackToMain }) {
    const [apiOptions, setApiOptions] = useState(false);
    const [apiInfoVisible, setApiInfoVisible] = useState(false);
    const [selectedTimeSeries, setSelectedTimeSeries] = useState(null);
    const [timeInterval, setTimeInterval] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');

    const showApiOptions = () => {
        setApiOptions(!apiOptions);
        setApiInfoVisible(false);
        setSelectedTimeSeries(null);
    };

    const showApiInformation = () => {
        setApiInfoVisible(!apiInfoVisible);
        setApiOptions(false);
        setSelectedTimeSeries(null);
    };

    const handleTimeSeriesClick = (series) => {
        setSelectedTimeSeries(series);
        setApiOptions(false);
    };

    const handleAddStock = () => {
        if (selectedTimeSeries === 'TIME_SERIES_INTRADAY' && !timeInterval) {
            toast.warn("Please select a time interval for the Intraday data.");
            return;
        }

        // Call the API with the selected time series, time interval (if applicable), and stock symbol
        // Replace the URL and data payload as per your API's requirements
        axios.post('http://localhost:3001/api/insertData', {
            table: selectedTimeSeries,
            data: {
                symbol: stockSymbol,
                // Include time interval in the data if it's for Intraday
                ...(selectedTimeSeries === 'TIME_SERIES_INTRADAY' && { interval: timeInterval })
            }
        }).then(response => {
            toast.success('Stock Data added:', response.data);
            setStockSymbol('');
            setTimeInterval('');
        }).catch(error => {
            console.error('Error adding stock data:', error);
            toast.error('Error adding stock data');
        }); 
    };

    const handleRemoveStock = async () => {
        if (!stockSymbol) {
            toast.warn("Please enter a stock symbol to remove.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/removeData', {
                symbols: stockSymbol,
                timeSeriesTable: mapTimeSeriesToTableName(selectedTimeSeries)
            });

            toast.success(`Stock removed: ${response.data}`);
            setStockSymbol(''); // Clear the input field after removal
        } catch (error) {
            console.error('Error removing stock:', error);
            toast.error('Error removing stock');
        }
    };
    
    // Helper function to map the selected time series to the corresponding table name
    const mapTimeSeriesToTableName = (timeSeries) => {
        switch (timeSeries) {
            case 'TIME_SERIES_INTRADAY':
                return 'rawintraday';
            case 'TIME_SERIES_DAILY':
                return 'rawdaily';
            case 'TIME_SERIES_WEEKLY':
                return 'rawweekly';
            case 'TIME_SERIES_MONTHLY':
                return 'rawmonthly';
            default:
                return null;
        }
    };

    return (
        <div className="alphaVantageContainer">
            <h2>Pulling data from AlphaVantage:</h2>
            <div className="buttonContainer">
                <button onClick={showApiOptions}>Call AlphaVantage API</button>
                <button onClick={showApiInformation}>Information on API</button>
            </div>
            {apiOptions && (
                <div className="apiInfo">
                    <div className="apiFunctions">
                        <h3>Select API Function:</h3>
                        <button className="buttonStyle" onClick={() => handleTimeSeriesClick('TIME_SERIES_INTRADAY')}>1: TIME_SERIES_INTRADAY</button>
                        <button className="buttonStyle" onClick={() => handleTimeSeriesClick('TIME_SERIES_DAILY')}>2: TIME_SERIES_DAILY</button>
                        <button className="buttonStyle" onClick={() => handleTimeSeriesClick('TIME_SERIES_WEEKLY')}>3: TIME_SERIES_WEEKLY</button>
                        <button className="buttonStyle" onClick={() => handleTimeSeriesClick('TIME_SERIES_MONTHLY')}>4: TIME_SERIES_MONTHLY</button>
                    </div>
                </div>
            )}

            {selectedTimeSeries && (
                <div>
                    <h3>Selected API Function: {selectedTimeSeries}</h3>
                    <div className="stockInputContainer">
                        <input 
                            type="text" 
                            value={stockSymbol} 
                            onChange={(e) => setStockSymbol(e.target.value)} 
                            placeholder="Enter Stock Symbol" 
                        />
                        <button onClick={handleAddStock}>Add</button>
                        <button onClick={handleRemoveStock}>Remove</button>
                    </div>
                </div>
            )}

            {selectedTimeSeries === 'TIME_SERIES_INTRADAY' && (
                <div className="timeIntervalSelection">
                    <select value={timeInterval} onChange={(e) => setTimeInterval(e.target.value)}>
                        <option value="">Select Interval</option>
                        <option value="1min">1min</option>
                        <option value="5min">5min</option>
                        <option value="15min">15min</option>
                        <option value="30min">30min</option>
                        <option value="60min">60min</option>
                    </select>
                </div>
            )}

            {apiInfoVisible && (
                <div className="apiInfo">
                    <div className="apiFunctions">

                <h2>Alpha Vantage API Information</h2>
                <br></br>
                <h3>API Functions:</h3>
                <br></br>
                <ul>
                    <li>
                        <strong>TIME_SERIES_INTRADAY:</strong> Returns the latest 100 data points based on the time interval provided (1min, 5min, 15min, 30min, 60min).
                    </li>
                    <br></br>
                    <li>
                        <strong>TIME_SERIES_DAILY:</strong> Returns raw daily data (date, daily open, daily high, daily low, daily close, daily volume).
                    </li>
                    <br></br>
                    <li>
                        <strong>TIME_SERIES_WEEKLY:</strong> Returns raw weekly data (last trading day of each week, weekly open, weekly high, weekly low, weekly close, weekly volume).
                    </li>
                    <br></br>
                    <li>
                        <strong>TIME_SERIES_MONTHLY:</strong> Returns raw monthly data (last trading day of each month, monthly open, monthly high, monthly low, monthly close, monthly volume).
                    </li>
                </ul>
            </div>
                </div>
            )}
            
            {/* {apiData && (           
                <div className="apiData">
                    <h3>API Data</h3>
                    <pre>{JSON.stringify(apiData, null, 2)}</pre>
                </div>
            )} */}
            <ToastContainer position="top-center" />
        </div>
    );
}

export default AlphaVantageOptions;

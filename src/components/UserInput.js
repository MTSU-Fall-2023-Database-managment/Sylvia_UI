import React, { useState } from 'react';
import './UserInput.css';

const Dashboard = () => {
    const [table, setTable] = useState('');
    const [symbol, setSymbol] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    const formatNumberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const fetchStockData = async () => {
        setIsLoading(true);
        setError('');

        const encodedSymbols = encodeURIComponent(symbol);

        const queryParams = new URLSearchParams({
            table,
            symbol: encodedSymbols,
            startDate,
            endDate,
        });

        try {
            const response = await fetch(`http://localhost:3001/api/retrieveData?${queryParams}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError('Failed to fetch data: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchStockData();
    };

    const handleSort = (field) => {
        const newSortDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(newSortDirection);

        const sortedData = [...data].sort((a, b) => {
            if (a[field] < b[field]) {
                return newSortDirection === 'asc' ? -1 : 1;
            }
            if (a[field] > b[field]) {
                return newSortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setData(sortedData);
    };

    const renderSortArrow = (field) => {
        if (sortField === field) {
            return sortDirection === 'asc' ? '↑' : '↓';
        }
        return '';
    };

    return (
        <div className="alphaVantageContainer">
            <h2>View Your Stock Data</h2>
            <form onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <select value={table} onChange={(e) => setTable(e.target.value)}>
                        <option value="">Select Function</option>
                        <option value="Intraday">Intraday</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>
                <div className="inputGroup">
                    <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        placeholder="Enter Stock Symbol"
                    />
                </div>
                <div className="inputGroup">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Start date"
                    />
                </div>
                <div className="inputGroup">
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="End date"
                    />
                </div>
                <button type="submit" className="submitButton">Submit</button>
            </form>
            
            {error && <p className="error">{error}</p>}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="apiData">
                    <table>
                        <thead>
                            <tr>
                            <th onClick={() => handleSort('Symbol')}>Symbol</th>
                            <th onClick={() => handleSort('TimeStamp')}>Timestamp {renderSortArrow('TimeStamp')}</th>
                            <th onClick={() => handleSort('Open')}>Open {renderSortArrow('Open')}</th>
                            <th onClick={() => handleSort('High')}>High {renderSortArrow('High')}</th>
                            <th onClick={() => handleSort('Low')}>Low {renderSortArrow('Low')}</th>
                            <th onClick={() => handleSort('Close')}>Close {renderSortArrow('Close')}</th>
                            <th onClick={() => handleSort('Volume')}>Volume {renderSortArrow('Volume')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td><a href={`/analytics/${item.Symbol}`}>{item.Symbol}</a></td>
                                    <td>{item.TimeStamp}</td>
                                    <td>{item.Open}</td>
                                    <td>{item.High}</td>
                                    <td>{item.Low}</td>
                                    <td>{item.Close}</td>
                                    <td>{formatNumberWithCommas(item.Volume)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

import React, { useState } from 'react';

const Dashboard = () => {
    const [tickers, setTickers] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchStockData = async (tickers) => {
        setIsLoading(true);
        setError('');

        try {
            // Replace with your actual API call
            const response = await fetch(`YOUR_API_ENDPOINT?tickers=${tickers}`);
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
        fetchStockData(tickers);
    };

    return (
        <div className="alphaVantageContainer">
            <h2>View Your Stock Data</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={tickers}
                    onChange={(e) => setTickers(e.target.value)}
                    placeholder="Enter stock tickers"
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p className="error">{error}</p>}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="apiData">
                    <table>
                        <thead>
                            <tr>
                                <th>Ticker</th>
                                <th>Price</th>
                                <th>Low</th>
                                <th>High</th>
                                <th>Volume</th>
                                {/* Add other headers as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ticker}</td>
                                    <td>{item.price}</td>
                                    {/* Add other data cells as needed */}
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

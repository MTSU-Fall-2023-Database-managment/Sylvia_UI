import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import "./Dashboard.css";

  const StockChart = () => {
  const [stockData, setStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState('CHSN');
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const stocks = ['BETS', 'CHSN', 'GOOGL', 'MOBQ', 'WNW']; // This will need future development for pulling current stock sybols in the daily table

  // Functions to calculate format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

   // Functions to calculate highlights
   const getMinClosingPrice = () => {
    return Math.min(...stockData.map(item => item.Close));
  };

  const getMaxClosingPrice = () => {
    return Math.max(...stockData.map(item => item.Close));
  };

  const getMinVolume = () => {
    return Math.min(...stockData.map(item => item.Volume));
  };

  const getMaxVolume = () => {
    return Math.max(...stockData.map(item => item.Volume));
  };

  useEffect(() => {
    const fetchData = async () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 30);

      const formatDateString = (date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      };

      const queryParams = new URLSearchParams({
        table: 'Daily',
        symbol: selectedStock,
        startDate: formatDateString(startDate),
        endDate: formatDateString(endDate),
      });

      try {
        const response = await fetch(`http://localhost:3001/api/retrieveData?${queryParams}`);
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, [selectedStock]);

  const handleStockChange = (e) => {
    setSelectedStock(e.target.value);
  };

  useEffect(() => {
    if (stockData.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
  
      const sortedData = stockData.sort((a, b) => new Date(a.TimeStamp) - new Date(b.TimeStamp));
      const dates = sortedData.map(item => formatDate(item.TimeStamp));
      const prices = sortedData.map(item => item.Close);
      const volumes = sortedData.map(item => item.Volume);
  
      const pointBackgroundColors = volumes.map((vol, index) => {
        if (index === 0) return '#0070c0'; // Setting the default color
        return vol > 2 * volumes[index - 1] ? 'red' : '#0070c0';
      });
  
      const ctx = chartRef.current.getContext('2d');
  
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: ``,
            data: prices,
            borderColor: '#0070c0',
            borderWidth: 2,
            fill: false,
            pointBackgroundColor: pointBackgroundColors,
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false,
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Closing Price'
              }
            }
          }
        }
      });
    }
  }, [stockData]);

  return (
    <>
      <h2 className="chart-title">Past 30 Day Analysis</h2>
      <div className='stock-selector'>
        <label>Select Stock: </label>
        <select value={selectedStock} onChange={handleStockChange}>
          {stocks.map(stock => (
            <option key={stock} value={stock}>{stock}</option>
          ))}
        </select>
      </div>
      <div className='canvas'>
        <canvas ref={chartRef} width={600} height={300}></canvas>
      </div>
      <div className='chart-highlights'>
        <div className='highlight-card'>
          <div className='highlight-title'>Min Closing Price</div>
          <div className='highlight-value'>{stockData.length > 0 ? getMinClosingPrice() : 'N/A'}</div>
        </div>
        <div className='highlight-card'>
          <div className='highlight-title'>Max Closing Price</div>
          <div className='highlight-value'>{stockData.length > 0 ? getMaxClosingPrice() : 'N/A'}</div>
        </div>
        <div className='highlight-card'>
          <div className='highlight-title'>Min Volume</div>
          <div className='highlight-value'>{stockData.length > 0 ? formatNumberWithCommas(getMinVolume()) : 'N/A'}</div>
        </div>
        <div className='highlight-card'>
          <div className='highlight-title'>Max Volume</div>
          <div className='highlight-value'>{stockData.length > 0 ? formatNumberWithCommas(getMaxVolume()) : 'N/A'}</div>
        </div>
      </div>
    </>
  );
};

export default StockChart;

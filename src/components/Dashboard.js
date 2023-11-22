import React, { Component } from 'react';

class StockChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    // Sample data for historical stock prices (you can replace this with real data)
    const stockData = [
      { date: "2022-01-01", price: 10.0 },
      { date: "2022-01-02", price: 15.0 },
      { date: "2022-01-03", price: 100.0 },
      { date: "2023-01-01", price: 80.0 },
      { date: "2023-01-02", price: 32.0 },
      { date: "2023-01-03", price: 5.0 },
      { date: "2023-01-04", price: 154.5 },
      { date: "2023-01-05", price: 157.2 },
      { date: "2023-10-25", price: 180.0 },
      { date: "2023-10-26", price: 179.5 },
      { date: "2023-10-27", price: 181.0 },
      { date: "2023-12-31", price: 250.0 },
    ];

    // Extract dates and prices from the data
    const dates = stockData.map(item => item.date);
    const prices = stockData.map(item => item.price);

    const canvas = this.refs.chartCanvas;
    const ctx = canvas.getContext("2d");

    // Create the stock price line chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#0070c0";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < dates.length; i++) {
      const x = i * (canvas.width / (dates.length - 1));
      const y = canvas.height - (prices[i] / 2); // Scale the prices for display
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
    ctx.closePath();
  }

  render() {
    return (
      <div className ='canvas'>
        <canvas ref="chartCanvas" width={600} height={300}></canvas>
      </div>
    );
  }
}

export default StockChart;

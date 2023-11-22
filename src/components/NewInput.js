import React, { useState } from 'react';
import './NewInput.css';

const SimpleForm = () => {
  const [formData, setFormData] = useState({
    stock: '',
    ticker: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with the following data:', formData);

    // Send the data to a server for processing here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="stock">Stock: </label>
        <input
          type="text"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="ticker">Ticker: </label>
        <input
          type="text"
          id="ticker"
          name="ticker"
          value={formData.ticker}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price: </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SimpleForm;

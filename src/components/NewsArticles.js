import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsArticles.css';

const NewsComponent = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'finance',
            apiKey: 'xxx',
          }
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching news", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      {articles.map((article, index) => (
        <div key={index} className="news-card">
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default NewsComponent;

import React from 'react';
import './Reviews.css';

function ReviewPage() {
  return (
    <div className="review-page">
      <header>
        <h1>Product Reviews</h1>
      </header>
      <section className="review-section">
        <div className="review">
          <h2>Invaluable Insights for Investors</h2>
          <p>
          I've been using this stock analytics application for over a year, and it has completely transformed the way I approach investing. 
          The depth of data and the quality of analysis provided here are unmatched. The user-friendly interface makes it easy to explore stocks, track their performance, and make informed decisions. 
          Whether you're a beginner or an experienced investor, this app is an invaluable tool for maximizing your investment portfolio.
          </p>
          <div className="rating">Rating: 4/5</div>
        </div>
        <div className="review">
          <h2>A Must-Have for Traders"</h2>
          <p>
          As a day trader, having access to real-time data and advanced analytics is crucial. 
          This stock analytics app delivers on all fronts. 
          The customizable dashboards, technical indicators, and live market news have helped me stay ahead of market trends and execute profitable trades. 
          It's a must-have tool for anyone serious about trading in today's fast-paced stock market.
          </p>
          <div className="rating">Rating: 5/5</div>
        </div>
        <div className="review">
          <h2>User-Friendly and Comprehensive</h2>
          <p>
          I appreciate how user-friendly this stock analytics application is while still offering a comprehensive set of features. 
          The stock screening tools are top-notch, and the historical data analysis allows me to spot long-term trends. The mobile app is equally impressive, making it convenient to stay updated on the go. 
          It's a well-rounded solution for both novice and professional investors.
          </p>
          <div className="rating">Rating: 4.8/5</div>
        </div>
        <div className="review">
          <h2>Accurate Predictions and Alerts</h2>
          <p>
          This app's predictive analytics and alert system have been incredibly accurate in helping me make timely investment decisions. 
          The AI-driven insights provide a competitive edge, and the app's ability to send real-time alerts for specific stock movements is a game-changer. 
          It's like having a personal financial advisor in your pocket.
          </p>
          <div className="rating">Rating: 5/5</div>
        </div>
        <div className="review">
          <h2>Exceptional Customer Support</h2>
          <p>
          One aspect that truly sets this stock analytics application apart is its exceptional customer support. 
          Whenever I've encountered an issue or had a question, the support team has been quick to respond and resolve any issues. 
          They genuinely care about their users' experience, and that level of dedication is hard to find in the world of financial apps.
          </p>
          <div className="rating">Rating: 4.7/5</div>
        </div>
      </section>
    </div>
  );
}

export default ReviewPage;

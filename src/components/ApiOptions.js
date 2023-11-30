import React, { useState } from 'react';

function ApiOptions() {
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);

  const handleButtonClick = () => {
    setShowAdditionalButtons(true);
  };

  const renderAdditionalButtons = () => {
    if (showAdditionalButtons) {
      const buttonStyle = {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginRight: '10px',
      };

      return (
        <div>
          <button style={buttonStyle}>1: TIME_SERIES_INTRADAY</button>
          <button style={buttonStyle}>2: TIME_SERIES_DAILY</button>
          <button style={buttonStyle}>3: TIME_SERIES_WEEKLY</button>
          <button style={buttonStyle}>4: TIME_SERIES_MONTHLY</button>
          <button style={buttonStyle}>5: Information on API</button>
          <button style={buttonStyle}>6: Main menu</button>
          <button style={buttonStyle}>~: Close application</button>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <button onClick={handleButtonClick} style={buttonStyle}>
        Show Additional Buttons
      </button>
      {renderAdditionalButtons()}
    </div>
  );
}

export default ApiOptions;

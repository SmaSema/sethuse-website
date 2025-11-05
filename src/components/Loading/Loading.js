import React from 'react';
import './Loading.css';

const Loading = ({ type = 'spinner', size = 'medium', text = 'Loading...', overlay = false }) => {
  return (
    <div className={`loading-container ${overlay ? 'loading-overlay' : ''}`}>
      {type === 'spinner' && (
        <div className={`spinner ${size}`}>
          <div className="spinner-ring"></div>
        </div>
      )}
      
      {type === 'dots' && (
        <div className={`dots-loading ${size}`}>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}
      
      {type === 'pulse' && (
        <div className={`pulse-loading ${size}`}>
          <div className="pulse-circle"></div>
        </div>
      )}
      
      {text && <div className="loading-text">{text}</div>}
    </div>
  );
};

export default Loading;
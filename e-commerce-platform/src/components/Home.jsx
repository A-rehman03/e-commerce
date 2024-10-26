// src/components/Home.jsx
import React from 'react';

const Home = () => {
  // Inline styles for animations
  const fadeInStyle = {
    animation: 'fadeIn 1s ease-in-out forwards',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: 'auto',
    margin: 'auto',
  };

  const titleStyle = {
    animation: 'scaleUp 0.5s ease-in-out forwards',
    fontSize: '2.5rem',
    color: '#3498db',
    transition: 'color 0.3s ease',
  };

  const descriptionStyle = {
    marginTop: '1rem',
    fontSize: '1.2rem',
    color: '#555',
  };

  return (
    <div style={fadeInStyle}>
      <h1
        style={titleStyle}
        onMouseOver={(e) => (e.target.style.color = '#2980b9')}
        onMouseOut={(e) => (e.target.style.color = '#3498db')}
      >
        Welcome to the E-commerce Platform
      </h1>
      <p style={descriptionStyle}>
        Explore our amazing products and offers!
      </p>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleUp {
            from {
              transform: scale(0.9);
            }
            to {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;

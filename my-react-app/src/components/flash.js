// FlashMessage.js
import './flash.css';
import React from 'react';

const FlashMessage = ({ message, type, onClose }) => {
    if (!message) return null;

    return (
        <div className={`flash-message ${type}`}>
            <span>{message}</span>
        </div>
    );
};

export default FlashMessage;
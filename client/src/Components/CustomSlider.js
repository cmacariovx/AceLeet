import React from 'react';
import './CustomSlider.css';

const CustomSlider = ({ value, onChange }) => {
    return (
        <input
            className="custom-slider"
            type="range"
            min={5}
            max={120}
            step={5}
            value={value}
            onChange={onChange}
        />
    );
};

export default CustomSlider;

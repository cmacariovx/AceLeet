import React from 'react';
import './CustomSlider.css';

const CustomSlider = ({ value, onChange, isInvalid }) => {
    return (
        <input
            className={!isInvalid ? "custom-slider" : "custom-slider-invalid"}
            type="range"
            min={5}
            max={120}
            step={5}
            value={value}
            onChange={onChange}
            disabled={isInvalid}
        />
    );
};

export default CustomSlider;

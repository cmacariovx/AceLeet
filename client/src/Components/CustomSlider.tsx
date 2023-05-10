import React, { ChangeEvent } from 'react';
import './CustomSlider.css';

interface Props {
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    isInvalid: boolean,
}

function CustomSlider({value, onChange, isInvalid}: Props) {
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

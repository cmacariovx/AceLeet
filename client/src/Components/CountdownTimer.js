import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import chime from '../assets/chime.mp3'

const CountdownTimer = ({ duration, onComplete, isPlaying, onRemainingTimeUpdate }) => {
  const alarmAudio = new Audio(chime);

  const renderTime = ({ remainingTime }) => {
    onRemainingTimeUpdate(remainingTime);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <div style={{fontSize: '32px', fontWeight: 'normal', userSelect: 'none', color: '#95aac9'}}>{`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</div>
    );
  };

  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={duration}
      colors={['#95aac9']}
      onComplete={() => {
        alarmAudio.play();
        onComplete();
        return [false, 0];
      }}
      size={250}
    >
      {renderTime}
    </CountdownCircleTimer>
  );
};

export default CountdownTimer;

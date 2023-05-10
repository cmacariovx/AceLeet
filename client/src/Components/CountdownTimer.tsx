import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import chime from '../assets/chime.mp3'

interface Props {
  duration: number,
  onComplete: () => void,
  isPlaying: boolean,
  onRemainingTimeUpdate: React.Dispatch<React.SetStateAction<number>>
}

function CountdownTimer({duration, onComplete, isPlaying, onRemainingTimeUpdate}: Props) {
  const alarmAudio = new Audio(chime);

  function renderTime({ remainingTime }: { remainingTime: number }) {
    onRemainingTimeUpdate(remainingTime);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <div style={{fontSize: '32px', fontWeight: 'normal', userSelect: 'none', color: '#95aac9'}}>{`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</div>
    );
  };

  const colors: any = ['#95aac9']

  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={duration}
      colors={colors}
      onComplete={(totalElapsedTime: number) => {
        alarmAudio.play();
        onComplete();
      }}
      size={250}
    >
      {renderTime}
    </CountdownCircleTimer>
  );
};

export default CountdownTimer;

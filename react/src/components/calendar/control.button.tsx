import React from 'react';
import { ControlButtonProps } from './calendar.type';

export const ControlButton: React.FC<ControlButtonProps> = ({ handlePrevious, handleNext, handleToday }): JSX.Element => {
  return (
    <div>
      <button type="button" onClick={handlePrevious}>Pre</button>
      <label onClick={handleToday}>Today</label>
      <button type="button" onClick={handleNext}>Next</button>
    </div>
  )
}
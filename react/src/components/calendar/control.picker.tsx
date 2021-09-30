import React from 'react';
import { ControlPickerProps } from './calendar.type';

export const ControlPicker: React.FC<ControlPickerProps> = ({ handleMonth, handleWeek, handleDay, handleList }): JSX.Element => {
  return (
    <div>
      <button type="button" onClick={handleMonth}>Month</button>
      <button type="button" onClick={handleWeek}>Week</button>
      <button type="button" onClick={handleDay}>Day</button>
      <button type="button" onClick={handleList}>List</button>
    </div>
  )
}
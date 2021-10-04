import React, { useState } from 'react';

import { DatePickerContextProps, DatePickerProps } from './datepicker.type';

export const DatePickerContext = React.createContext<DatePickerContextProps>(undefined);

export const DatePicker: React.FC<DatePickerProps> = (): JSX.Element => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="datepicker">
      <DatePickerContext.Provider value={{ currentDate, setCurrentDate }}>

      </DatePickerContext.Provider>
    </div>
  )
}
import React from 'react';

export const SchedulerContext = React.createContext<SchedulerContextProps>(undefined);

export const Scheduler: React.FC<SchedulerProps> = (): JSX.Element => {

  return (
    <div className="schedule">
      <SchedulerContext.Provider value={{}}>

      </SchedulerContext.Provider>
    </div>
  )
}
import { addDays, addMonths, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

export const getWeekDays = (currentDate = new Date()): Date[] => {
  const days: Date[] = [];
  const startDate = startOfWeek(currentDate);

  for (let i = 0; i < 7; i++) {
    days.push(addDays(startDate, i));
  }

  return days;
}

export const getMonthDays = (currentDate = new Date()): Date[] => {
  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(startMonth);
  const startDate = startOfWeek(startMonth);
  const endDate = endOfWeek(endMonth);

  const days: Date[] = [];

  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return days;
}

export const getTimeDays = (): void => {
  //
}
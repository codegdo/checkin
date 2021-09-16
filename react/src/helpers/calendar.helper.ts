import {
  addMinutes,
  addHours,
  addDays,
  startOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth
} from "date-fns";
import { hourToMinutes } from "../utils";

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
  const startDay = startOfWeek(startMonth);
  const endDay = endOfWeek(endMonth);

  const days: Date[] = [];
  let day = startDay;

  while (day <= endDay) {
    days.push(day);
    day = addDays(day, 1);
  }

  return days;
}

export const getIntervalTimes = (start: string, end: string, interval = 15): Date[] => {
  const currentDate = new Date();
  const startOfTime = startOfDay(currentDate);
  const midOfTime = addHours(startOfTime, 12);
  const startTime = addMinutes(startOfTime, hourToMinutes(start));
  const endTime = addMinutes(midOfTime, hourToMinutes(end));

  const slots: Date[] = [];
  let slot = startTime;

  while (slot <= endTime) {
    slots.push(slot);
    slot = addMinutes(slot, interval)
  }

  return slots;
}
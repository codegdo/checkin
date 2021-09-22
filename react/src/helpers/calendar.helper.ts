import {
  differenceInMinutes,
  getMinutes,
  getHours,
  addMinutes,
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

export const getTimelines = (start: string, end: string, interval = 15): Date[] => {
  const currentDate = new Date();
  const startOfTime = startOfDay(currentDate);
  const startTime = addMinutes(startOfTime, hourToMinutes(start));
  const endTime = addMinutes(startOfTime, hourToMinutes(end));

  const slots: Date[] = [];
  let slot = startTime;

  while (slot <= endTime) {
    slots.push(slot);
    slot = addMinutes(slot, interval)
  }

  return slots;
}

export const getTimeIntervals = (start: string, end: string): { [key: string]: number } => {
  const currentDate = new Date();
  const startOfTime = startOfDay(currentDate);
  const startTime = addMinutes(startOfTime, hourToMinutes(start));
  const endTime = addMinutes(startOfTime, hourToMinutes(end));

  const offset = Math.abs(differenceInMinutes(startTime, currentDate));
  const remaining = Math.abs(differenceInMinutes(currentDate, endTime));
  const total = Math.abs(differenceInMinutes(startTime, endTime));

  return { offset, remaining, total }

}

export const calculateTimeOffset = (start: string): number => {
  const currentDate = new Date();
  const startOfTime = startOfDay(currentDate);
  const startTime = addMinutes(startOfTime, hourToMinutes(start));

  return Math.abs(differenceInMinutes(startTime, currentDate));
}

export const calculateTimeRemaining = (end: string): number => {
  const currentDate = new Date();
  const startOfTime = startOfDay(currentDate);
  const endTime = addMinutes(startOfTime, hourToMinutes(end));

  return Math.abs(differenceInMinutes(currentDate, endTime));
}

export const calculateTimeInterval = (start: string, end: string): number => {
  const currentDate = new Date();
  const startOfTime = startOfDay(currentDate);
  const startTime = addMinutes(startOfTime, hourToMinutes(start));
  const endTime = addMinutes(startOfTime, hourToMinutes(end));

  return Math.abs(differenceInMinutes(startTime, endTime));
}
import { MEAL_TIMINGS } from '../data/messData.js';

export const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

export const formatDateToDataKey = (date) => {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = String(date.getFullYear()).slice(-2);
  return `${d}-${m}-${y}`;
};

export const getActiveMeal = () => {
  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  );

  const mins = now.getHours() * 60 + now.getMinutes();

  const b = MEAL_TIMINGS.breakfast;
  const l = MEAL_TIMINGS.lunch;
  const t = MEAL_TIMINGS.tea;
  const d = MEAL_TIMINGS.dinner;

  const between = (s, e) =>
    mins >= timeToMinutes(s) && mins <= timeToMinutes(e);

  if (between(b.start, b.end)) return 'breakfast';
  if (between(l.start, l.end)) return 'lunch';
  if (between(t.start, t.end)) return 'tea';
  if (between(d.start, d.end)) return 'dinner';

  if (mins < timeToMinutes(b.start)) return 'breakfast';
  if (mins < timeToMinutes(l.start)) return 'lunch';
  if (mins < timeToMinutes(t.start)) return 'tea';
  if (mins < timeToMinutes(d.start)) return 'dinner';

  return 'breakfast';
};
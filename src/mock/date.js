import dayjs from 'dayjs';
import { getRandomInteger } from '../presenter/utils.js';
import { Duration } from './const';

let date = dayjs().subtract(getRandomInteger(0, Duration.DAY), 'day').toDate();

export function getDate({ next }) {
  const minute = getRandomInteger(0, Duration.MIN);
  const hour = getRandomInteger(1, Duration.HOUR);
  const days = getRandomInteger(0, Duration.DAY);

  if (next) {
    date = dayjs(date)
      .add(minute, 'minute')
      .add(hour, 'hour')
      .add(days, 'day')
      .toDate();
  }

  return date;
}

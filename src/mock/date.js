import dayjs from 'dayjs';
import { getRandomInteger } from '../presenter/utils.js';
import { Duration } from './const';

let date = dayjs().subtract(getRandomInteger(0,Duration.DAY), 'day').toDate();
function getDate({next}) {
  const minGap = getRandomInteger(0, Duration.MIN);
  const hourGap = getRandomInteger(1, Duration.HOUR);
  const daysGap = getRandomInteger(0, Duration.DAY);

  if (next) {
    date = dayjs(date)
      .add(minGap, 'min')
      .add(hourGap, 'hour')
      .add(daysGap, 'day')
      .toDate();
  }

  return date;
}

export {getDate};

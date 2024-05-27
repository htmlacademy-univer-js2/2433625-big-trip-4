import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { MSEC_IN_HOUR, MSEC_IN_DAY, TRIP_POINTS_COUNT, DateFormat, DurationFormat, FilterType } from './const.js';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const getRandomPositiveNumber = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const getRandomDate = (start = new Date(2022, 0, 1), end = new Date(2025, 0, 1)) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
const formatDate = (currentDate, format = DateFormat.FULL) => dayjs(currentDate).format(format);

const calculateDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDuration;

  switch (true) {
    case (diff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(diff).format(DurationFormat.DAYS);
      break;
    case (diff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(diff).format(DurationFormat.HOURS);
      break;
    case (diff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(diff).format(DurationFormat.MINS);
      break;
  }

  return pointDuration;
};
const incrementCounter = (START_FROM) => {
  let counterStart = START_FROM;
  return function() {
    return counterStart++;
  };
};

const toCapitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

const isPointFuture = (point) => dayjs().isBefore(point.dateFrom);
const isPointPresent = (point) => dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo);
const isPointPast = (point) => dayjs().isAfter(point.dateTo);

const filterByType = {
  [FilterType.ANY]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point))
};

const SnakeToCamel = (string) => string.replace(/_([a-z])/g, (result) => result[1].toUpperCase());
const deepCamel = (object) => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(deepCamel);
  }

  const res = Object.fromEntries(Object.entries(object).map(([key, value]) => [SnakeToCamel(key), deepCamel(value)]));
  return res;
};

const CamelToSnake = (string) => string.replace(/[A-Z]/g, (result) => `_${result.toLowerCase()}`);
const deepSnake = (object) => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(deepSnake);
  }

  const res = Object.fromEntries(Object.entries(object).map(([key, value]) => [CamelToSnake(key), deepSnake(value)]));
  return res;
};

const getRouteLabel = (sortedPoints, destinations) => {
  const pointsDestinations = sortedPoints
    .map((point) => destinations.find((destination) => destination.id === point.destination)?.name);

  if (pointsDestinations.length <= TRIP_POINTS_COUNT) {
    return pointsDestinations.join(' &mdash; ');
  }
  return `${pointsDestinations.at(0)}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${pointsDestinations.at(-1)}`;
};

const getDurationPeriod = (sortedPoints) => {
  if (!sortedPoints.length) {
    return '';
  }

  const startDateTime = dayjs(sortedPoints[0].dateFrom).format(DateFormat.SHORT);
  if (sortedPoints.length === 1) {
    return startDateTime;
  }

  return `${startDateTime}&nbsp;&mdash;&nbsp;${dayjs(sortedPoints.at(-1).dateTo).format(DateFormat.SHORT)}`;
};
const getPointOffersCost = (pointOffersIds, offers) => pointOffersIds.reduce((offerCost, id) => offerCost + (offers.find((offer) => offer.id === id)?.price ?? 0), 0);

const getTotalPointsCost = (points, offers) => points.reduce((total, point) => {
  const typeOffers = offers.find((offer) => offer.type === point.type)?.offers ?? [];
  return total + point.basePrice + getPointOffersCost(point.offers, typeOffers);
}, 0);

const ApiData = (data) => deepCamel(data);
const ApiToData = (point) => deepSnake(point);

export {
  getRandomArrayElement,
  getRandomPositiveNumber,
  getRandomDate,
  formatDate,
  calculateDuration,
  incrementCounter,
  toCapitalize,
  ApiData,
  ApiToData,
  filterByType,
  getRouteLabel,
  getDurationPeriod,
  getTotalPointsCost,
};

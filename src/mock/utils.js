import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { MILLISECONDS_IN_HOUR, MILLISECONDS_IN_DAY, MAX_DISPLAYED_TRIP_POINTS, DATE_FORMAT, DURATION_FORMAT, FILTERS_BY_TYPES, SORTING_BY_TYPE } from '../mock/const';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomPositiveNumber = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomDate = (start = new Date(2022, 0, 1), end = new Date(2025, 0, 1)) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const formatDate = (currentDate, format = DATE_FORMAT.FULL) => dayjs(currentDate).format(format);

const getDatesDiff = (dateStringFrom, dateStringTo) => dayjs(dateStringTo).diff(dayjs(dateStringFrom));

const getDuration = (dateStringFrom, dateStringTo) => dayjs.duration(getDatesDiff(dateStringFrom, dateStringTo));

const toCapitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

const incrementCounter = (START_FROM) => {
  let counterStart = START_FROM;
  return function() {
    return counterStart++;
  };
};

const isPointFuture = (point) => dayjs().isBefore(point.dateFrom);
const isPointPresent = (point) => dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo);
const isPointPast = (point) => dayjs().isAfter(point.dateTo);

const filterByType = {
  [FILTERS_BY_TYPES.ANY]: (points) => [...points],
  [FILTERS_BY_TYPES.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FILTERS_BY_TYPES.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FILTERS_BY_TYPES.PAST]: (points) => points.filter((point) => isPointPast(point))
};

const sortPointsByDate = (pointA, pointB) => getDatesDiff(pointB.dateFrom, pointA.dateFrom);
const sortPointsByTime = (pointA, pointB) => {
  const pointADuration = getDuration(pointA.dateFrom, pointA.dateTo).asMilliseconds();
  const pointBDuration = getDuration(pointB.dateFrom, pointB.dateTo).asMilliseconds();
  return pointBDuration - pointADuration;
};
const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortByType = {
  [SORTING_BY_TYPE.DAY]: (points) => points.toSorted(sortPointsByDate),
  [SORTING_BY_TYPE.EVENT]: () => {
    throw new Error(`Sort by ${SORTING_BY_TYPE.EVENT} is disabled`);
  },
  [SORTING_BY_TYPE.TIME]: (points) => points.toSorted(sortPointsByTime),
  [SORTING_BY_TYPE.PRICE]: (points) => points.toSorted(sortPointsByPrice),
  [SORTING_BY_TYPE.OFFER]: () => {
    throw new Error(`Sort by ${SORTING_BY_TYPE.OFFER} is disabled`);
  },
};

const calculateDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDuration;

  switch (true) {
    case (diff >= MILLISECONDS_IN_DAY):
      pointDuration = dayjs.duration(diff).format(DURATION_FORMAT.DAYS);
      break;
    case (diff >= MILLISECONDS_IN_HOUR):
      pointDuration = dayjs.duration(diff).format(DURATION_FORMAT.HOURS);
      break;
    case (diff < MILLISECONDS_IN_HOUR):
      pointDuration = dayjs.duration(diff).format(DURATION_FORMAT.MINS);
      break;
  }

  return pointDuration;
};

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);
const deleteItem = (items, del) => items.filter((item) => item.id !== del.id);

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

const ApiData = (data) => deepCamel(data);
const ApiToData = (point) => deepSnake(point);

const getRouteLabel = (sortedPoints, destinations) => {
  const pointsDestinations = sortedPoints
    .map((point) => destinations.find((destination) => destination.id === point.destination)?.name);

  if (pointsDestinations.length <= MAX_DISPLAYED_TRIP_POINTS) {
    return pointsDestinations.join(' &mdash; ');
  }
  return `${pointsDestinations.at(0)}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${pointsDestinations.at(-1)}`;
};

const getDurationPeriod = (sortedPoints) => {
  if (!sortedPoints.length) {
    return '';
  }

  const startDateTime = dayjs(sortedPoints[0].dateFrom).format(DATE_FORMAT.SHORT);
  if (sortedPoints.length === 1) {
    return startDateTime;
  }

  return `${startDateTime}&nbsp;&mdash;&nbsp;${dayjs(sortedPoints.at(-1).dateTo).format(DATE_FORMAT.SHORT)}`;
};

const getOfferPointCosts = (pointOffersIds, offers) => pointOffersIds.reduce((offerCost, id) => offerCost + (offers.find((offer) => offer.id === id)?.price ?? 0), 0);

const getTotalPointsCost = (points, offers) => points.reduce((total, point) => {
  const typeOffers = offers.find((offer) => offer.type === point.type)?.offers ?? [];
  return total + point.basePrice + getOfferPointCosts(point.offers, typeOffers);
}, 0);

export {
  getRandomArrayElement,
  getRandomPositiveNumber,
  getRandomDate,
  calculateDuration,
  incrementCounter,
  toCapitalize,
  ApiData,
  ApiToData,
  filterByType,
  getRouteLabel,
  getDurationPeriod,
  getTotalPointsCost,
  getDuration,
  updateItem,
  sortByType,
  deleteItem,
  formatDate,
};

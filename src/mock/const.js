const POINTS_COUNT = 5;

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * HOURS_IN_DAY;

const MAX_PRICE_VALUE = 200;
const MAX_IMAGES_COUNT = 5;
const EVENT_TYPE = 'taxi';
const HOST = 'https://21.objects.htmlacademy.pro/big-trip';
const TOKEN = 'Basic drhd9rehd0dr057a';

const BASE_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: EVENT_TYPE,
};

const REQUIRED_BASE_POINT_FIELDS = ['dateFrom', 'dateTo', 'destination', 'type'];

const REQUIRED_POINT_FIELDS = ['dateFrom', 'dateTo', 'destination', 'type', 'basePrice'];

const TYPES_OF_EVENT = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const CITIES = [
  'Accra',
  'Alexandria',
  'Algiers',
  'Almaty',
  'Amsterdam',
  'Ankara',
  'Antalya',
  'Antananarivo',
  'Antwerp',
  'Anshan',
  'Astana',
  'Asuncion',
  'Athens',
  'Ashgabat',
  'Baghdad',
  'Basel',
  'Baku',
  'Bangalore',
];

const DESCRIPTIONS = [
  'A travel agency is a professional travel agency that provides a full range of services in the field of organizing leisure and travel.',
  'It will help you choose the ideal route, book tickets and accommodation, and also provide the necessary advisory assistance',
  'The travel agency works only with trusted partners and guarantees high quality services.',
  'In addition, it offers various types of recreation: from extreme tours to romantic trips and family vacations.',
  'You can be sure that your holiday will be unforgettable and safe.',
];

const MAX_DISPLAYED_TRIP_POINTS = 3;

const MethodHttp = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const EDITING_BY_TYPE = {
  EDITING: 'Editing point',
  CREATING: 'Creating point',
};

const PointCondition = {
  IDLE: 'IDLE',
  EDITABLE: 'EDITABLE',
};

const PointEnd = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};

const FILTERS_BY_TYPES = {
  ANY: 'any',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SORTING_BY_TYPE = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const SettingsForFilters = {
  [FILTERS_BY_TYPES.ANY]: {
    label: 'Everything',
    defaultSelected: true,
  },
  [FILTERS_BY_TYPES.FUTURE]: { label: 'Future' },
  [FILTERS_BY_TYPES.PRESENT]: { label: 'Present' },
  [FILTERS_BY_TYPES.PAST]: { label: 'Past' },
};

const SORTING_ITEMS = [
  {
    type: SORTING_BY_TYPE.DAY,
    label: 'Day',
    active: true,
    defaultSelected: true,
  },
  {
    type: SORTING_BY_TYPE.EVENT,
    label: 'Event',
    active: false,
  },
  {
    type: SORTING_BY_TYPE.TIME,
    label: 'Time',
    active: true,
  },
  {
    type: SORTING_BY_TYPE.PRICE,
    label: 'Price',
    active: true,
  },
  {
    type: SORTING_BY_TYPE.OFFER,
    label: 'Offer',
    active: false,
  },
];

const DATE_FORMAT = {
  TIME: 'HH:mm',
  SHORT: 'MMM DD',
  FULL: 'YYYY-MM-DDTHH:mm',
  WITH_DELIMITER: 'DD/MM/YY HH:mm',
  WITH_DELIMITER_FLAT_PICKER: 'd/m/y H:i',
};
const DURATION_FORMAT = {
  DAYS: 'DD[D] HH[H] mm[M]',
  HOURS: 'HH[H] mm[M]',
  MINS: 'mm[M]',
};
const Price = {
  MIN: 1,
  MAX: 500,
};
const MocksMaxCount = {
  OFFERS: 7,
  POINTS: 5,
};

const UPDATING_BY_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const ActionType = {
  UPDATE_POINT: 'UPDATE_POINT',
  DELETE_POINT: 'DELETE_POINT',
  CREATE_POINT: 'CREATE_POINT',
};

const LimitBlock = {
  LOWER: 250,
  UPPER: 1000,
};

export {
  POINTS_COUNT,
  TYPES_OF_EVENT,
  MAX_PRICE_VALUE,
  MAX_IMAGES_COUNT,
  CITIES,
  DESCRIPTIONS,
  SORTING_ITEMS,
  BASE_POINT,
  REQUIRED_BASE_POINT_FIELDS,
  MAX_DISPLAYED_TRIP_POINTS,
  FILTERS_BY_TYPES,
  SettingsForFilters,
  SORTING_BY_TYPE,
  DATE_FORMAT,
  DURATION_FORMAT,
  Price,
  MocksMaxCount,
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_HOUR,
  PointCondition,
  UPDATING_BY_TYPE,
  EDITING_BY_TYPE,
  TOKEN,
  MethodHttp,
  PointEnd,
  HOST,
  REQUIRED_POINT_FIELDS,
  ActionType,
  LimitBlock,
};

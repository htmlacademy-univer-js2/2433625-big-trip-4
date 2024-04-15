const CITIES = [
  'Pekin','Paris',
  'Moskva','Sochi',
  'Ekaterinburg','Amsterdam','China',
];

const DESCRIPTION = ['Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];

const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Sightseeing'];

const FilterType = {
  ANY: 'any',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const FilterSettings = {
  [FilterType.ANY]: {
    label: 'Everything',
    defaultSelected: true,
  },
  [FilterType.FUTURE]: { label: 'Future' },
  [FilterType.PRESENT]: { label: 'Present' },
  [FilterType.PAST]: { label: 'Past' },
};

const SORTING_COLUMNS = [
  {
    type: SortType.DAY,
    label: 'Day',
    active: true,
    defaultSelected: true,
  },
  {
    type: SortType.EVENT,
    label: 'Event',
    active: false,
  },
  {
    type: SortType.TIME,
    label: 'Time',
    active: true,
  },
  {
    type: SortType.PRICE,
    label: 'Price',
    active: true,
  },
  {
    type: SortType.OFFER,
    label: 'Offer',
    active: false,
  },
];


const Price = {
  MIN: 0,
  MAX: 10000
};

const Duration = {
  HOUR: 10,
  DAY: 10,
  MIN: 59,
};

export {
  CITIES,
  DESCRIPTION,
  Price,
  Duration,
  TYPES,
  OFFER_COUNT,
  POINT_COUNT,
  DESTINATION_COUNT,
  FilterType,
  SortType,
  FilterSettings,
  SORTING_COLUMNS,
};

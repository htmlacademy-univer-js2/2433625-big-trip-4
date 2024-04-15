import {getRandomInteger} from '../presenter/utils.js';
import { Price } from './const';
import { getDate } from './date';

function generatePoint(type, destinationID, offerIds) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(Price.MIN, Price.MAX),
    dateFrom: getDate({next:false}),
    dateTo: getDate({next:true}),
    destination: destinationID,
    isFavorite: !!getRandomInteger(0,1),
    offers: offerIds,
    type
  };
}

export {generatePoint};

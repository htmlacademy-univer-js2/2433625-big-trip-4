import { getRandomInteger } from '../presenter/utils.js';
import { Price } from './const';

function generateOffer(type) {
  return {
    id: crypto.randomUUID(),
    title:`Offer ${type}`,
    price: getRandomInteger(Price.MIN, (Price.MAX / 10))
  };
}

export {generateOffer};

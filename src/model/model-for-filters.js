import Observable from '../framework/observable.js';
import { FILTERS_BY_TYPES } from '../mock/const.js';

export default class FiltersModel extends Observable {
  #filter = FILTERS_BY_TYPES.ANY;

  get() {
    return this.#filter;
  }

  set(updateType, update) {
    this.#filter = update;
    this._notify(updateType, update);
  }
}

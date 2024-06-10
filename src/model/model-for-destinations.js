import Observable from '../framework/observable.js';
import { deleteItem, updateItem } from '../mock/utils.js';
import { UPDATING_BY_TYPE } from '../mock/const.js';

export default class DestinationsModel extends Observable {
  #service;
  #destinations = null;

  constructor(service) {
    super();
    this.#service = service;
  }

  async init() {
    try {
      this.#destinations = await this.#service.destinations;
      this._notify(UPDATING_BY_TYPE.INIT, { data: this.#destinations });
    } catch (err) {
      this.#destinations = [];
      this._notify(UPDATING_BY_TYPE.INIT, { error: err });
    }
  }

  get() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  add(type, destination) {
    this.#destinations.push(type, destination);
    this._notify(destination);
  }

  delete(type, destination) {
    this.#destinations = deleteItem(this.#destinations, destination);
    this._notify(type, destination);
  }

  update(type, destination) {
    this.#destinations = updateItem(this.#destinations, destination);
    this._notify(type, destination);
  }
}

import Observable from '../framework/observable.js';
import { deleteItem, updateItem } from '../mock/utils.js';
import { UPDATING_BY_TYPE } from '../mock/const.js';

export default class OffersModel extends Observable {
  #service;
  #offers = null;

  constructor(service) {
    super();
    this.#service = service;
  }

  async init() {
    try {
      this.#offers = await this.#service.offers;
      this._notify(UPDATING_BY_TYPE.INIT, { data: this.#offers });
    } catch (err) {
      this.#offers = [];
      this._notify(UPDATING_BY_TYPE.INIT, { error: err });
    }
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type.toLowerCase()).offers;
  }

  add(type, offer) {
    this.#offers.push(offer);
    this._notify(type, offer);
  }

  delete(type, offer) {
    this.#offers = deleteItem(this.#offers, offer);
    this._notify(type, offer);
  }

  update(type, offer) {
    this.#offers = updateItem(this.#offers, offer);
    this._notify(type, offer);
  }
}

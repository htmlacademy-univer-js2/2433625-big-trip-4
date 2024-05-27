import Observable from '../framework/observable.js';
import { deleteItem, updateItem } from '../presenter/utils.js';
import { ApiData } from '../utils.js';
import { UpdateType } from '../const.js';

export default class PointsModel extends Observable {
  #service = null;
  #points = null;

  constructor(service) {
    super();
    this.#service = service;
  }

  async init() {
    try {
      const data = await this.#service.points;
      const points = data.map(ApiData);
      this.#points = points;
      this._notify(UpdateType.INIT, { data: points });

    } catch (err) {
      this.#points = [];
      this._notify(UpdateType.INIT, { error: err });
    }
  }

  get() {
    return this.#points;
  }

  add(type, point) {
    this.#points.push(point);
    this._notify(type, point);
  }

  update(type, point) {
    this.#points = updateItem(this.#points, point);
    this._notify(type, point);
  }

  delete(type, point) {
    this.#points = deleteItem(this.#points, point);
    this._notify(type, point);
  }
}

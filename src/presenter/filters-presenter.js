import {
  render
} from '../framework/render.js';

import FiltersView from '../view/filters-view.js';
import { FilterSettings } from '../const.js';
import { filterByType } from '../utils';
export default class FiltersPresenter {
  #pointsModel = null;
  #container = null;
  #filters = [];

  constructor({ container, pointsModel }) {
    this.#pointsModel = pointsModel;
    this.#container = container;

    this.#filters = Object.entries(filterByType)
      .map(([type, filter]) => ({
        ...FilterSettings[type],
        type,
        disabled: filter(this.#pointsModel.get()).length === 0
      }));
  }

  init() {
    render(new FiltersView({
      items: this.#filters
    }), this.#container);
  }
}

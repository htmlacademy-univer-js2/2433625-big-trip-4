import { render,replace } from '../framework/render.js';
import FiltersView from '../view/view-filters.js';
import { SettingsForFilters, UPDATING_BY_TYPE } from '../mock/const.js';
import { filterByType } from '../mock/utils.js';

export default class FiltersPresenter {
  #container = null;
  #pointsModel = null;
  #filtersModel = null;
  #filters = [];
  #filtersView = null;

  constructor({ container, pointsModel, filtersModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;

    this.#pointsModel.addObserver(this.#eventPointsHandler);
    this.#filtersModel.addObserver(this.#eventFiltersHandler);
  }

  init() {
    this.#filters = this.#filtersCreating();
    this.#filtersView = this.#viewCreating();
    render(this.#filtersView, this.#container);
  }

  #filtersUpdate() {
    if (!this.#filtersView) {
      return;
    }

    this.#filters = this.#filtersUpdating();
    const newFiltersView = this.#viewCreating();

    replace(newFiltersView, this.#filtersView);
    this.#filtersView = newFiltersView;
  }

  #filtersCreating() {
    const points = this.#pointsModel.get();
    const currentFilter = this.#filtersModel.get();

    return Object.entries(filterByType)
      .map(([type, filter]) => ({
        ...SettingsForFilters[type],
        type,
        selected: currentFilter === type,
        disabled: points ? filter(points).length === 0 : true
      }));
  }

  #filtersUpdating() {
    const points = this.#pointsModel.get();
    const currentFilter = this.#filtersModel.get();
    return this.#filters.map((filter) => ({
      ...filter,
      selected: currentFilter === filter.type,
      disabled: filterByType[filter.type](points).length === 0
    }));
  }

  #viewCreating() {
    return new FiltersView({
      items: this.#filters,
      onFilterChange: this.#changingFiltersHandler,
    });
  }

  #eventFiltersHandler = () => {
    this.#filtersUpdate();
  };

  #changingFiltersHandler = (filterType) => {
    this.#filtersModel.set(UPDATING_BY_TYPE.MAJOR, filterType);
  };

  #eventPointsHandler = () => {
    this.#filtersUpdate();
  };
}

import { remove, render} from '../framework/render.js';
import EventsListView from '../view/view-events-list.js';
import EventsListEmptyView from '../view/view-events-list-empty.js';
import { SORTING_ITEMS, SORTING_BY_TYPE, UPDATING_BY_TYPE, LimitBlock, ActionType } from '../mock/const.js';
import PointPresenter from './presenter-for-point.js';
import { sortByType, filterByType } from '../mock/utils.js';
import SortingView from '../view/view-sorting.js';
import LoaderView from '../view/view-loader.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class LeaderPresenter {
  #container = null;
  #createPointPresenter = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filtersModel = null;

  #loaderCase = new LoaderView();
  #loading = true;
  #error = false;
  #sorting = SORTING_BY_TYPE.DAY;
  #listCase = new EventsListView();
  #sortingCase = null;
  #presenterForPoints = new Map();
  #block = new UiBlocker({
    lowerLimit: LimitBlock.LOWER,
    upperLimit: LimitBlock.UPPER,
  });

  constructor({
    container,
    pointsModel,
    offersModel,
    destinationsModel,
    createPointPresenter,
    filtersModel,
  }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#pointsModel.addObserver(this.#eventModelFiltersHandler);
    this.#createPointPresenter = createPointPresenter;
    this.#filtersModel = filtersModel;
    this.#pointsModel.addObserver(this.#eventModelHandler);
    this.#filtersModel.addObserver(this.#eventModelFiltersHandler);
  }

  get points() {
    const points = this.#pointsModel.get();
    const filterType = this.#filtersModel.get();
    const filteredPoints = filterByType[filterType](points);

    return sortByType[this.#sorting](filteredPoints);
  }

  init() {
    this.#renderRoute();
    this.#createPointPresenter.init(this.#userActionHandler);
  }

  destroy() {
    remove(this.#sortingCase);
    remove(this.#listCase);
    this.#clearing();
  }

  #loaderRender() {
    render(this.#loaderCase, this.#container);
  }

  #stubRender() {
    render(new EventsListEmptyView(), this.#container);
  }

  #sortRender() {
    this.#sortingCase = new SortingView({
      items: SORTING_ITEMS,
      selectedSortType: this.#sorting,
      onSortChange: this.#sortingChangeHandler,
    });

    render(this.#sortingCase, this.#container);
  }

  #renderRoute() {
    if (this.#loading) {
      this.#createPointPresenter.setButtonDisabled(true);
      this.#loaderRender();
      return;
    }

    this.#createPointPresenter.setButtonDisabled(false);
    if (!this.points.length) {
      this.#stubRender();
      return;
    }

    this.#sortRender();
    this.#pointsRender();
  }

  #pointsRender() {
    render(this.#listCase, this.#container);
    this.points.forEach((point) => {
      this.#pointRender(point);
    });
  }

  #clearing() {
    this.#presenterForPoints.forEach((presenter) => presenter.destroy());
    this.#presenterForPoints.clear();
    remove(this.#sortingCase);
  }

  #pointRender(point) {
    const pointPresenter = new PointPresenter({
      container: this.#listCase.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onUserAction: this.#userActionHandler,
      onEditorOpen: this.#pointEditHandler,
    });

    pointPresenter.init(point);
    this.#presenterForPoints.set(point.id, pointPresenter);
  }

  #userActionHandler = async (actionType, data) => {
    this.#block.block();
    let presenter;
    try {
      switch (actionType) {
        case ActionType.CREATE_POINT:
          presenter = this.#createPointPresenter;
          await this.#createPointHandler(data);
          break;

        case ActionType.UPDATE_POINT:
          presenter = this.#presenterForPoints.get(data.id);
          await this.#updatePointHandler(data);
          break;

        case ActionType.DELETE_POINT:
          presenter = this.#presenterForPoints.get(data.id);
          await this.#deletePointHandler(data);
          break;
        default:
          throw new Error(`RoutePresenter - unknown user action: ${actionType}`);
      }
      presenter.resetView();
    } catch (err) {
      presenter.triggerError();
      this.#error = true;
    }

    this.#block.unblock();
  };

  #createPointHandler = (data) =>
    this.#pointsModel.create(UPDATING_BY_TYPE.MAJOR, data);

  #deletePointHandler = (data) =>
    this.#pointsModel.delete(UPDATING_BY_TYPE.MAJOR, data);

  #updatePointHandler = (data) =>
    this.#pointsModel.update(UPDATING_BY_TYPE.MINOR, data);

  #pointEditHandler = () => {
    this.#presenterForPoints.forEach((presenter) => presenter.resetView());
  };

  #sortingChangeHandler = (sortType) => {
    this.#sorting = sortType;
    this.#clearing();
    this.#renderRoute();
  };

  #eventModelHandler = (type, data) => {

    if (this.#error || data?.error) {
      return;
    }

    switch (type) {
      case UPDATING_BY_TYPE.INIT:
        this.#loading = false;
        remove(this.#loaderCase);
        this.#renderRoute();
        break;

      case UPDATING_BY_TYPE.PATCH:
        this.#presenterForPoints.get(data.id)?.init(data);
        break;
      case UPDATING_BY_TYPE.MINOR:
      case UPDATING_BY_TYPE.MAJOR:
      default:
        this.#clearing();
        this.#renderRoute();
        break;
    }
  };

  #eventModelFiltersHandler = (type) => {
    switch (type) {
      case UPDATING_BY_TYPE.INIT:
      case UPDATING_BY_TYPE.PATCH:
      case UPDATING_BY_TYPE.MINOR:
      case UPDATING_BY_TYPE.MAJOR:
      default:
        this.#clearing();
        this.#renderRoute();
        break;
    }
  };
}

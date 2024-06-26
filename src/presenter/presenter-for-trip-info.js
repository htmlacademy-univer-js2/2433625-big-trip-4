import { render, RenderPosition, replace} from '../framework/render.js';
import { SORTING_BY_TYPE } from '../mock/const.js';
import { sortByType } from '../mock/utils.js';
import TripInfoView from '../view/view-trip-info.js';

export default class TripInfoPresenter {
  #container = null;
  #points = null;
  #destinations = null;
  #offers = null;
  #tripInfo = null;

  constructor({container, pointsModel, destinationsModel, offersModel}) {
    this.#container = container;
    this.#points = pointsModel;
    this.#destinations = destinationsModel;
    this.#offers = offersModel;

    this.#points.addObserver(this.#pointsModelEventHandler);
  }

  init() {
    this.#tripInfo = new TripInfoView(this.#getTripInfoProps());
    render(this.#tripInfo, this.#container, RenderPosition.AFTERBEGIN);

  }

  #updateInfo() {
    const prevTripInfoComponent = this.#tripInfo;
    this.#tripInfo = new TripInfoView(this.#getTripInfoProps());

    if(!prevTripInfoComponent) {
      throw new Error('TripInfoPresenter: presenter not initialized!');
    }

    replace(this.#tripInfo, prevTripInfoComponent);

  }

  #getTripInfoProps() {
    const points = this.#points.get();
    return {
      points: points ? sortByType[SORTING_BY_TYPE.DAY](points) : [],
      destinations: this.#destinations.get(),
      offers: this.#offers.get(),
      isLoading: !points,
    };
  }

  #pointsModelEventHandler = () => {
    this.#updateInfo();
  };
}

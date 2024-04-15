import AbstractView from '../framework/view/abstract-view';
import { createPointTemplate } from '../point-template';

export default class PointView extends AbstractView{
  #handleEditClick = null;
  #point = null;
  #pointDestination = null;
  #pointOffers = null;

  constructor({point, pointDestination, pointOffers, onEditClick}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}

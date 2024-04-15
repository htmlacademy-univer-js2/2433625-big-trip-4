import AbstractView from '../framework/view/abstract-view';
import { createPointTemplate } from '../point-template';

export default class PointView extends AbstractView{
  //constructor({point, pointDestination, pointOffers}) {
   // this.point = point;
    //this.pointDestination = pointDestination;
    //this.pointOffers = pointOffers;
  //}

  #point = null;
  #pointDestination = null;
  #pointOffers = null;

  constructor({point, pointDestination, pointOffers}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
  }

  get template() {
    return createPointTemplate;
  }
}

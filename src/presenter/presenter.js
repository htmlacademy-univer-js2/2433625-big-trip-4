import EditingFormView from '../view/editing-form-view.js';
import SortingView from '../view/sorting-view.js';
import TripListView from '../view/trip-list-view.js';
import TripPointView from '../view/trip-point-view.js';
import { render } from '../render.js';

export default class Presenter {
  init (eventsContainer) {
    this.tripEventsContainer = eventsContainer;
    render(new TripListView(), this.tripEventsContainer);
    render(new SortingView(), this.tripEventsContainer);

    const eventsList = eventsContainer.querySelector('.trip-events__list');
    render(new EditingFormView(), eventsList);

    for (let i = 0; i < 3; i++) {
      render(new TripPointView, eventsList);
    }
  }
}
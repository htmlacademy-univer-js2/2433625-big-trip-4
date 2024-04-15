import AbstractView from '../framework/view/abstract-view';
import { createEventListTemplate } from '../event-list-template';

export default class EventListView extends AbstractView{
  get template() {
    return createEventListTemplate;
  }
}

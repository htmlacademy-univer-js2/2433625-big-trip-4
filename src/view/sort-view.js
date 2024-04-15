import AbstractView from '../framework/view/abstract-view';
import { createListSortElement } from '../sort-template';

export default class ListSortElement extends AbstractView{
  get template() {
    return createListSortElement;
  }
}

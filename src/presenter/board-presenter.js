import { render, replace } from '../render';
import EventListView from '../view/event-list-view';
import ListSortElement from '../view/sort-view';
import NewPoint from '../view/add-new-point';
import PointView from '../view/point-view';
import EditPoint from '../view/edit-point-view';

export default class BoardPresenter {
  #sortComponent = new ListSortElement();
  #eventListComponent = new EventListView();
  #container = null;

  constructor({container}) {
    this.#container = container;
  }

  init(){
    this.#renderBoard();
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPoint({
      point,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }
  }

  #renderBoard() {
    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);
    render(new EditPoint(), this.#eventListComponent.getElement());
    render(new NewPoint(), this.#eventListComponent.getElement());

    for(let i = 0; i < 3; i++){
      render(new PointView(), this.#eventListComponent.getElement());
    }
  }
}

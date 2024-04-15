import AbstractView from '../framework/view/abstract-view';
import { editPointTemplate } from '../edit-point-template';


export default class EditPoint extends AbstractView {
  #handleFormSubmit = null;
  #point = null;

  constructor({point, onFormSubmit}) {
    super();
    this.#point = point;
    this.#handleFormSubmit = onFormSubmit;

    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return editPointTemplate(this.#point);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
}

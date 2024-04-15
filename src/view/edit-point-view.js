import AbstractView from '../framework/view/abstract-view';
import { editPointTemplate } from '../edit-point-template';


export default class EditPoint extends AbstractView{
  get template() {
    return editPointTemplate;
  }
}

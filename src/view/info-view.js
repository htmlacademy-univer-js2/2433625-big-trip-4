import AbstractView from '../framework/view/abstract-view';
import { mainInfo } from '../info-template';

export default class MainInfo extends AbstractView{
  get template() {
    return mainInfo;
  }
}

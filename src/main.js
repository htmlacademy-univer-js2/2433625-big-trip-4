import FiltersView from './view/filters-view.js';
import { render } from './render.js';
import Presenter from './presenter/presenter.js';

const pageHeader = document.querySelector('.page-header');
const pageMain = document.querySelector('.page-main');
const filterElement = pageHeader.querySelector('.trip-controls__filters');
const tripEvents = pageMain.querySelector('.trip-events');

render(new FiltersView(), filterElement);

const tripPresenter = new Presenter();

tripPresenter.init(tripEvents);
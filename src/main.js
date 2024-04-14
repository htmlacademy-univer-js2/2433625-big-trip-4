import ListFilterElement from './view/filter-view';
import {render, RenderPosition} from './render';
// import ListSortElement from './view/sort-view';
// import ListElement from './view/point-view';
// import NewPoint from './view/add-new-point';
// import EventListView from './view/event-list-view';
import BoardPresenter from './presenter/board-presenter';
import MainInfo from './view/info-view';
import MockService from './service/service-mock';
import PointsModel from './model/pointsm';
import DestinationsModel from './model/destm';
import OffersModel from './model/offersm';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.page-header');
const siteListFilter = headerElement.querySelector('.trip-controls__filters');
const tripMain = headerElement.querySelector('.trip-main');
const eventsList = bodyElement.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offerModel = new OffersModel(mockService);
const pointModel = new PointsModel(mockService);

const boardPresenter = new BoardPresenter({
  container: eventsList,
  destinationsModel,
  offerModel,
  pointModel
});
render(new MainInfo(), tripMain, RenderPosition.AFTERBEGIN);
render(new ListFilterElement(), siteListFilter);

boardPresenter.init();

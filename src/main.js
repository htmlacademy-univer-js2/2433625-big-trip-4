import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import MockService from './service/mock-service.js';
import LeaderPresenter from './presenter/leader-presenter.js';

import CreatePointPresenter from './presenter/creating-point-presenter.js';

const mockService = new MockService();
const pointsModel = new PointsModel(mockService);
const offersModel = new OffersModel(mockService);
const destinationsModel = new DestinationsModel(mockService);

const pointsContainer = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');
const tripMainContainer = document.querySelector('.trip-main');

const createPointPresenter = new CreatePointPresenter({
  container: tripMainContainer,
  editorContainer: pointsContainer,
  pointsModel,
  offersModel,
  destinationsModel,
});

const leaderPresenter = new LeaderPresenter({
  container: pointsContainer,
  createPointBtnContainer: tripMainContainer,
  pointsModel,
  offersModel,
  destinationsModel
});

const filtersPresenter = new FiltersPresenter({ container: filtersContainer, pointsModel });

const tripInfoPresenter = new TripInfoPresenter(tripMainContainer);

createPointPresenter.init();
leaderPresenter.init();
filtersPresenter.init();
tripInfoPresenter.init();

import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersModel from './model/filters-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import LeaderPresenter from './presenter/leader-presenter.js';
import CreatePointPresenter from './presenter/creating-point-presenter.js';
import MainApiService from './service/api-service.js';

const apiService = new MainApiService();
const pointsModel = new PointsModel(apiService);
const offersModel = new OffersModel(apiService);
const destinationsModel = new DestinationsModel(apiService);
const filtersModel = new FiltersModel();

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
  createPointPresenter,
  pointsModel,
  offersModel,
  destinationsModel
});

const filtersPresenter = new FiltersPresenter({ container: filtersContainer, pointsModel, filtersModel });

const tripInfoPresenter = new TripInfoPresenter(tripMainContainer);

const bootstrap = async () => {
  await Promise.all([
    offersModel.init(),
    destinationsModel.init(),
  ]);
  pointsModel.init();

  leaderPresenter.init();
  filtersPresenter.init();
  tripInfoPresenter.init();
};

bootstrap();

import PointsModel from './model/model-for-points.js';
import OffersModel from './model/model-for-offers.js';
import FiltersModel from './model/model-for-filters.js';
import DestinationsModel from './model/model-for-destinations.js';

import LeaderPresenter from './presenter/presenter-for-leader.js';
import FiltersPresenter from './presenter/presenter-for-filters.js';
import CreatePointPresenter from './presenter/presenter-for-creating-point.js';
import TripInfoPresenter from './presenter/presenter-for-trip-info.js';

import ApiService from './service/api-service.js';

const service = new ApiService();

const pointsModel = new PointsModel(service);
const offersModel = new OffersModel(service);
const destinationsModel = new DestinationsModel(service);
const filtersModel = new FiltersModel();

const pointsCase = document.querySelector('.trip-events');
const filtersCase = document.querySelector('.trip-controls__filters');
const tripCase = document.querySelector('.trip-main');

const createPointPresenter = new CreatePointPresenter({
  container: tripCase,
  editorContainer: pointsCase,
  offersModel,
  destinationsModel,
});

const leaderPresenter = new LeaderPresenter({
  container: pointsCase,
  createPointPresenter,
  pointsModel,
  offersModel,
  destinationsModel,
  filtersModel,
});

const tripInfo = new TripInfoPresenter({
  container: tripCase,
  destinationsModel,
  offersModel,
  pointsModel,
});

const filtersPresenter = new FiltersPresenter({ container: filtersCase, pointsModel, filtersModel });

const bootstrap = async () => {
  await Promise.all([
    offersModel.init(),
    destinationsModel.init(),
  ]);
  pointsModel.init();
  leaderPresenter.init();
  filtersPresenter.init();
  tripInfo.init();
};
bootstrap();

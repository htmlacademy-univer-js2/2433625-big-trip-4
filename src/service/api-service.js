import ApiService from '../framework/api-service.js';
import { PointEnd, HOST, TOKEN } from '../const.js';

export default class MainApiService extends ApiService {
  _defaultHeaders = new Headers({'Content-Type': 'application/json'});

  constructor() {
    super(HOST, TOKEN);
  }

  get points() {
    return this._load({url: PointEnd.POINTS})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: PointEnd.DESTINATIONS})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: PointEnd.OFFERS})
      .then(ApiService.parseResponse);
  }
}

import ApiService from '../framework/api-service.js';
import { PointEnd, HOST, TOKEN, MethodHttp } from '../const.js';

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

  async createPoint(point) {
    const response = await this._load({
      url: PointEnd.POINTS,
      method: MethodHttp.POST,
      body: JSON.stringify(point),
      headers: this._defaultHeaders,
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${PointEnd.POINTS}/${point.id}`,
      method: MethodHttp.PUT,
      body: JSON.stringify(point),
      headers: this._defaultHeaders,
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deletePoint(point) {
    await this._load({
      url: `${PointEnd.POINTS}/${point.id}`,
      method: MethodHttp.DELETE,
    });

    return Promise.resolve();
  }
}

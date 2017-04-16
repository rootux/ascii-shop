export default class Products {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
  }

  get(skip = 0, limit = 10) {
    return this._$http({
      url: `${this._AppConstants.api}products`,
      method: 'GET',
      data: {"skip": skip, "limit": limit}
    });
  }


}

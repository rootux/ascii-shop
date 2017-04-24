export default class Products {
  constructor(AppConstants, $http, DataStream) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._DataStream = DataStream;
  }

  get(skip = 0, limit = 10, sortBy) {
    var params = {
      url: `${this._AppConstants.api}products?limit=${limit}&skip=${skip}&sort=${sortBy}`,
      pattern: '{id size price face}',
      // done: this.done
    };
    return this._DataStream.get(params);
    // return Oboe({
    //   url: `${this._AppConstants.api}products`,
    //   pattern: '{id size price face}'
    // });
  

    // return this._$http({
      
    //   method: 'GET',
    //   data: {"skip": skip, "limit": limit}
    // });
  }

  // done(res) {
  //   console.log(res);
  // }


}

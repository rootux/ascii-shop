const PRODUCT_PATTERN = '{id size price face}';

export default class Products {
  constructor(AppConstants, $http, DataStream, $log, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._DataStream = DataStream;
    this._$log = $log;
    this._$q = $q;
    
    this.buffer = [];
    this.loadedItems = 0;
    this.lastLimit = -1;
    this.lastSkip = -1;
    this.lastSortBy;
  }

  clearBuffer() {
    this.buffer = [];
  }

  get(skip, limit, sortBy, isForBuffer = false) {
    if(sortBy != this.lastSortBy) {
      this.clearBuffer();
    }
    this._$log.info(`get products ${skip} ${limit} ${sortBy}`);

    let deferred = this._$q.defer();

    // Unload buffer
    // TODO check all buffer race condition - for example - buffer is half full
    if(skip == this.lastSkip && this.buffer.length > 0) {
      this._$log.info("unload buffer and load more");
      deferred.resolve(this.buffer);
      this.clearBuffer();
      skip = limit + skip;
    }

    this.lastLimit = limit;
    this.lastSkip = skip;
    this.lastSortBy = sortBy;
    
    this._$log.info(`after get products ${skip} ${limit} ${sortBy}`);
    
    var params = {
      url: `${this._AppConstants.api}products?limit=${limit}&skip=${skip}&sort=${sortBy}`,
      pattern: PRODUCT_PATTERN,
      cache: true
    };

    this._DataStream.get(params).then( () => {
    }, err => {
      deferred.reject(err);
    },
    node => {
      this.loadedItems++;
      if(!isForBuffer) {
        deferred.notify(node);
      }
      
      // Check if should load more items
      if(this.loadedItems == this.lastLimit) {
        this._$log.info(`Loading next buffer`);
        return this.get(this.lastSkip + this.lastLimit, this.lastLimit, this.lastSortBy, true);
      }
    });

    return deferred.promise;
  }


}

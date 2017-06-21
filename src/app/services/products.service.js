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
      if(isForBuffer) {
        this.buffer.push(node);
      }else {
        deferred.notify(node);
      }
      
      this.shouldLoadMoreItems(deferred, isForBuffer);
    });

    return deferred.promise;
  }

  shouldLoadMoreItems(deferred, isForBuffer) {
    if(this.loadedItems != this.lastLimit) {
      return;
    }
    
    this.loadedItems = 0;
    if(isForBuffer) {
      this._$log.info('Second load for Buffer has finished');
      return;
    }else {
      deferred.notify({isFinishedLoading: true});
    }
    this._$log.info(`Loading next buffer`);
    return this.get(this.lastSkip + this.lastLimit, this.lastLimit, this.lastSortBy, true);
  }


}

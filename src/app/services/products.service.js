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
    this.lastSortBy = null;
  }

  get(skip, limit, sortBy, isForBuffer = false) {
    this._$log.debug(`get products ${skip} ${limit} ${sortBy}`);
    if(sortBy != this.lastSortBy) {
      this._clearBuffer();
    }

    let deferred = this._$q.defer();

    // TODO check all buffer race condition - for example - buffer is half full
    if(this._isRequestAlreadyCached(skip)) {
      this._$log.debug("unload buffer and load more");
      deferred.resolve(this.buffer);
      this._clearBuffer();
      skip = limit + skip;
    }

    this.lastLimit = limit;
    this.lastSkip = skip;
    this.lastSortBy = sortBy;
    
    this._getFromDataStream(skip, limit, sortBy, isForBuffer, deferred);

    return deferred.promise;
  }

  _clearBuffer() {
    this.buffer = [];
  }

  _isRequestAlreadyCached(skip) {
    return (skip == this.lastSkip && this.buffer.length > 0);
  }

  _getFromDataStream(skip, limit, sortBy, isForBuffer, deferred) {
    let params = {
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
      
      this._shouldLoadMoreItems(deferred, isForBuffer);
    });
  }

  _shouldLoadMoreItems(deferred, isForBuffer) {
    if(this.loadedItems != this.lastLimit) {
      return;
    }
    
    this.loadedItems = 0;
    if(isForBuffer) {
      this._$log.debug('Second load for Buffer has finished');
      return;
    }else {
      deferred.notify({isFinishedLoading: true});
    }
    this._$log.debug(`Loading next buffer`);
    return this.get(this.lastSkip + this.lastLimit, this.lastLimit, this.lastSortBy, true);
  }


}

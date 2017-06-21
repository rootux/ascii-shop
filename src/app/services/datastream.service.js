let oboe = require('oboe');

export default class DataStream {
  constructor(AppConstants, $q) {
    'ngInject';

    this._$q = $q;
  }

  get(params) {
    // TODO - use ES2015 Promise
    let defer = this._$q.defer();
    oboe(params)
      .start(begin)
      .fail(error)
      .node(params.pattern, stream);

    function begin(status) {
      if (typeof params.start === 'function' && status === 200) {
        params.start(stream);
      }
    }

    function error(err) {
      defer.reject(err);
      
      // make sure oboe cleans up memory
      return oboe.drop;
    }

    function stream(n) {
      defer.notify(n);
      return oboe.drop;
    }

    return defer.promise;
  }
}
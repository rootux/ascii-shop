let oboe = require('oboe');

export default class DataStream {
  constructor(AppConstants, $q) {
    'ngInject';

    this._$q = $q;
  }

  get(params) {
    let defer = this._$q.defer();
    oboe(params)
    .start(begin)
    .fail(error)
    .node(params.pattern, stream)
    .done(complete);

    function begin(status) {
      if (typeof params.start === 'function' && status === 200) {
          params.start(stream);
      }
    }

    function complete() {
      if (typeof params.done === 'function') {
        params.done();
      }
      // make sure oboe cleans up memory
      return oboe.drop;
    }

    function error(err) {
      defer.reject(err);
    }

    function stream(n) {
      defer.notify(n);
      return oboe.drop;
    }

    return defer.promise;
  }
}
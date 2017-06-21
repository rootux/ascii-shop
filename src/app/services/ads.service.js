export default class Ads {
  constructor() {
    'ngInject';

    this.lastAd = -1;
  }

  setLastAd(id) {
    this.lastAd = id;
  }

  getLastAd() {
    return this.lastAd;
  }
  
}

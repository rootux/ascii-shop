class AdCtrl {
  constructor(Ads) {
    'ngInject';
    this._Ads = Ads;
    this.random = -1;

    this.setUniqueAd();
  }

  setUniqueAd() {
    do {
      this.random = Math.floor(Math.random()*1000);
    } while (this._Ads.getLastAd() === this.random);
    this._Ads.setLastAd(this.random);
  }
}

let Ad = {
  controller: AdCtrl,
  templateUrl: 'ads/ad/ad.html',
  bindings: {
    adItem: '<'
  }
};

export default Ad;

import angular from 'angular';

let adsModule = angular.module('app.ads', []);

import Ad from './ad/ad.component';
adsModule.component('ad', Ad);

export default adsModule;
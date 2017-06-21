import angular from 'angular';

let servicesModule = angular.module('app.services', []);

import ProductsService from './products.service';
servicesModule.service('Products', ProductsService);

import AdsService from './ads.service';
servicesModule.service('Ads', AdsService);

import DataStream from './datastream.service';
servicesModule.service('DataStream', DataStream);

export default servicesModule;

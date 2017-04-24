import angular from 'angular';

let servicesModule = angular.module('app.services', []);

import ProductsService from './products.service';
servicesModule.service('Products', ProductsService);

import DataStream from './datastream.service';
servicesModule.service('DataStream', DataStream);

export default servicesModule;

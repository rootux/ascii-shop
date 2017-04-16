import angular from 'angular';

let servicesModule = angular.module('app.services', []);

import ProductsService from './products.service';
servicesModule.service('Products', ProductsService);

export default servicesModule;

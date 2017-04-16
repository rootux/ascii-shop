import angular from 'angular';

let module = angular.module('app.products', []);

import Product from './product/product.component'
module.component('product', Product);


export default module;

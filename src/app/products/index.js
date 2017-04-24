import angular from 'angular';

let productsModule = angular.module('app.products', []);

import Product from './product/product.component';
productsModule.component('product', Product);

import ProductsList from './products-list/products-list.component';
productsModule.component('productsList', ProductsList);

import ProductsOverview from './products-overview/products-overview.component';
productsModule.component('productsOverview', ProductsOverview);


export default productsModule;

import angular from 'angular';

let componentsModule = angular.module('app.components', []);

import OnScrollToBottom from './on-scroll-to-bottom.directive';
componentsModule.directive('onScrollToBottom', OnScrollToBottom);

export default componentsModule;

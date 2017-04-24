import angular from 'angular';

let filtersModule = angular.module('app.filters', []);

import TimeAgo from './timeago.filter';
filtersModule.filter('timeAgo', TimeAgo);

export default filtersModule;

function AppConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
  .state('app', {
    abstract: true,
    // templateUrl: 'layout/app-view.html',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: '../home/home.html',
  });

  $urlRouterProvider.otherwise('/404');

}

export default AppConfig;

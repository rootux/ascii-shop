function AppConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'layout/app-view.html',
  });

  $urlRouterProvider.otherwise('/home');

}

export default AppConfig;

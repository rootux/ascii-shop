function AppRun(AppConstants, $rootScope, $location) {
  'ngInject';

  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.setPageTitle(toState.title);
  });

  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = title;
  };

}

export default AppRun;

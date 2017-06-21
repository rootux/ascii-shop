function OnScrollToBottom() {
  'ngInject';

  let spacing = 80;
  let delayBetweenCalls = 300; //TODO: better use a callback and test when the call is done
  let last = new Date().getTime();

  return {
    
    restrict: 'A',
    link: function (scope, element, attrs) {
      const fn = attrs.onScrollToBottom,
        clientHeight = element[0].clientHeight;

      element.on('scroll', function (e) {
        const el = e.target;

        if ((el.scrollHeight - el.scrollTop) <= clientHeight + spacing) {
          let now = new Date().getTime();
          if(now - last > delayBetweenCalls) {
            last = now;
            scope.$apply(fn);
          }
        }
      });
    }
    
  }; 
}

export default OnScrollToBottom;

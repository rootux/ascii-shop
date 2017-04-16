angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("home/home.html","<main class=\"main container-fluid\" show-authed=\"true\">\n  <side-navigation class=\"col-xs-2\"></side-navigation>\n  </div>\n\n  <div class=\"col-xs-10 main-content\" ui-view>\n  </div>\n</main>");
$templateCache.put("layout/app-view.html","<div ui-view class=\"app-ui-view\"></div>");
$templateCache.put("products/product/product.html","<div>\n  Product\n</div>");
$templateCache.put("products/products-list/products-list.html","<div>\nProducts\n</div>");
$templateCache.put("products/products-overview/products-overview.html","<div>\n  <products-list></posts-list>\n</div>");}]);
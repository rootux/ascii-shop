class ProductsOverviewCtrl {
  constructor(Products, $log, AppConstants) {
    'ngInject';
    this._Products = Products;
    this.products = [];
    this._$log = $log;
    this.numberOfProducsToLoad = AppConstants.numberOfProducsToLoad;
    this.skip = 0;
    this.sortBy = AppConstants.defaultProductsSortBy;
    this.getProducts();
  }

  getProducts(skip = this.skip, limit = this.numberOfProducsToLoad, sortBy = this.sortBy) {
    this._Products.get(skip, limit, sortBy).then( res => {
    },
    err => {
      this._$log.error(err);
    },
    node => {
      this.products.push(node);
    });
  }

  loadMoreProducts() {
    this.skip += this.numberOfProducsToLoad;
    this._$log.info("Loading more products");
    this.getProducts();
  }

  handleOnSort(params) {
    this.products = [];
    this.lastSortBy = params.sortBy;
    this.getProducts();
  }
}

let ProductsOverview = {
  controller: ProductsOverviewCtrl,
  templateUrl: 'products/products-overview/products-overview.html'
};

export default ProductsOverview;

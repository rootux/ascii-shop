class ProductsOverviewCtrl {
  constructor(Products, $log, AppConstants) {
    'ngInject';
    this._Products = Products;
    this.products = [];
    this.getProducts();
    this._$log = $log;
    this.numberOfProducsToLoad = AppConstants.numberOfProducsToLoad;
  }

  getProducts(skip = 0, limit = 10, sortBy = 'price') {
    this._Products.get(skip, limit, sortBy).then( res => {
    },
    err => {
      this._$log.error(err);
    },
    node => {
      this.products.push(node);
    });
  }

  handleOnSort(params) {
    this.products = [];
    this.getProducts(0, this.numberOfProducsToLoad, params.sortBy);
  }
}

let ProductsOverview = {
  controller: ProductsOverviewCtrl,
  templateUrl: 'products/products-overview/products-overview.html'
};

export default ProductsOverview;

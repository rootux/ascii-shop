class ProductsOverviewCtrl {
  constructor(Products, $log, AppConstants) {
    'ngInject';
    this._Products = Products;
    this.products = [];
    this._$log = $log;
    this.numberOfProducsToLoad = AppConstants.numberOfProducsToLoad;
    this.skip = 0;
    this.sortBy = AppConstants.defaultProductsSortBy;
    this.isLoading = false;
    this.getProducts();
  }

  getProducts(skip = this.skip, limit = this.numberOfProducsToLoad, sortBy = this.sortBy) {
    this.isLoading = true;
    this._Products.get(skip, limit, sortBy).then( res => {
      res.forEach(p => { this.products.push(p); });
      this.isLoading = false;
    },
    err => {
      this.isLoading = false;
      this._$log.error(err);
    },
    node => {
      if(node.isFinishedLoading) {
        this.isLoading = false; 
      }else {
        this.products.push(node);
      }
    });
  }

  loadMoreProducts() {
    this.skip += this.numberOfProducsToLoad;
    this._$log.info("Loading more products");
    this.getProducts();
  }

  handleOnSort(params) {
    this.products = [];
    this.sortBy = params.sortBy;
    this.skip = 0;
    this.getProducts();
  }
}

let ProductsOverview = {
  controller: ProductsOverviewCtrl,
  templateUrl: 'products/products-overview/products-overview.html'
};

export default ProductsOverview;

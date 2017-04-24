class ProductsOverviewCtrl {
  constructor(Products, $log) {
    'ngInject';
    this._Products = Products;
    this.products = [];
    this.getProducts();
    this._$log = $log;
  }

  getProducts() {
    this._Products.get().then( res => {
      // this.products = res; 
    }, 
    err => {
      this._$log.error(err);
    },
    node => {
      this.products.push(node);
    });
  }
}

let ProductsOverview = {
  controller: ProductsOverviewCtrl,
  templateUrl: 'products/products-overview/products-overview.html'
};

export default ProductsOverview;

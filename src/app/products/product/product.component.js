class ProductCtrl {
  constructor() {
    'ngInject';
  }
}

let Product = {
  controller: ProductCtrl,
  templateUrl: 'products/product/product.html',
  bindings: {
    productItem: '<',
  }
};

export default Product;

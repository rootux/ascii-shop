class ProductsFilterCtrl {
  constructor() {
    'ngInject';
  }
}

let ProductsFilter= {
  controller: ProductsFilterCtrl,
  templateUrl: 'products/products-filter/products-filter.html',
  bindings: {
    onSort: '&',
  }
};

export default ProductsFilter;

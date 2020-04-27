import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

/* NgRx */
import { select, Store } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productAction from '../state/product.actions';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(
    // todo вот теперь и с ленивой загрузкой все будет норм работать
    private store: Store<fromProduct.State>,
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );

    this.store
      .pipe(
        select(fromProduct.getCurrentProduct)
      ).subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: (err: any) => this.errorMessage = err.error
    });

    /// получаем значение из селектора
    this.store.pipe(
      select((fromProduct.getShowProductCode)),
    ).subscribe(
      products => {
        this.displayCode = products;
      }
    );
  }

  ngOnDestroy(): void {

  }

  checkChanged(value: boolean): void {
    // this.displayCode = value;
    this.store.dispatch(
      new productAction.ToggleProductCode(value)
    );
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(
      new productAction.InitializeCurrentProduct()
    );
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(
      new productAction.SetCurrentProduct(product)
    );
  }

}

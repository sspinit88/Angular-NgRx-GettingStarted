import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

/* NgRx */
import { select, Store } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productAction from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage$: Observable<string>;

  displayCode: boolean;

  products: Product[];

  private componentActive = true;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(
    // todo вот теперь и с ленивой загрузкой все будет норм работать
    private store: Store<fromProduct.State>,
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.errorMessage$ = this.store.pipe(
      select(fromProduct.getError)
    );

    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );
    this.store
      .pipe(
        select(fromProduct.getCurrentProduct)
      ).subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: (err: any) => this.errorMessage = err.error
    // });
    // todo вот так делаем запрос на сервер
    this.store.dispatch(new productAction.Load());
    // todo теперь получаем продукты из стора (они там появятся как только будет получен ответ с сервера)
    this.store
      .pipe(
        select(fromProduct.getProduct),
        takeWhile(() => this.componentActive),
      ).subscribe(
      (res: Product[]) => {
        this.products = res;
      }
    );

    /// получаем значение из селектора
    this.store.pipe(
      select((fromProduct.getShowProductCode)),
      // todo вот так можно отписаться через takeWhile
      takeWhile(() => this.componentActive),
    ).subscribe(
      products => {
        this.displayCode = products;
      }
    );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
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

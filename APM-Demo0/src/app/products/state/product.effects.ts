import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';

import * as productActions from './product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product } from '../product';
import { LoadFail } from './product.actions';

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {
  }

  @Effect()
  loadProducts$ = this.actions$
    .pipe(
      // фильтруем action
      ofType(productActions.ProductActionTypes.Load),
      mergeMap(
        // указываем тип action и объединяем поток с получаемым потоком из сервиса
        (action: productActions.Load) =>
          this.productService
            .getProducts()
            .pipe(
              // оповещаем редуктор
              map((res: Product[]) => (new productActions.LoadSuccess(res))),
              // todo если запрос возвращает ошибку, то можно ее отловить так
              catchError(err => of(new productActions.LoadFail(err)))
            )
      )
    );

}

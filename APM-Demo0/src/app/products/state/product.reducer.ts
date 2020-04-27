import { Product } from '../product';
import { RootState } from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

/*
* todo вот теперь пойдет для ленивой загрузки
* */
export interface State extends RootState {
  product: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}


/*
* описываем стартовое состояние
* */
const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};


/*
* определяем селекторы
* */
const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(
  getProductFeatureState,
  // возвращаем требуемое значение
  state => state.showProductCode,
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct,
);
export const getProduct = createSelector(
  getProductFeatureState,
  state => state.products,
);


/*
* reducer(state, action) :
* state - состояние из нашего хранилища;
* action - действие подлежащее обработке;
* */
export function reducer(state: ProductState = initialState, action): ProductState {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        showProductCode: action.payload,
      };
    default:
      return state;
  }
}

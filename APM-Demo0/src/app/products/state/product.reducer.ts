import { RootState } from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';
import { Product } from '../product';

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
  error: string;
}


/*
* описываем стартовое состояние
* */
const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: '',
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
export const getError = createSelector(
  getProductFeatureState,
  state => state.error,
);


/*
* reducer(state, action) :
* state - состояние из нашего хранилища;
* action - действие подлежащее обработке;
* */
export function reducer(state = initialState, action: ProductActions): ProductState {

  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };

    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...action.payload }
      };

    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };

    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        }
      };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: '',
      };
    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload,
      };
    default:
      return state;
  }
}

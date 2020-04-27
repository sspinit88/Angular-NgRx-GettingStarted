/*
* todo описываем интерфейс состояния магазина.
*  Такой вариант не годится для работы с ленивой загрузкой:
* export interface State {
*   product: ProductState;
*   user: any;
*  }
* */

export interface State {
  user: any;
}

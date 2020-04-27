/*
* reducer(state, action) :
* state - состояние из нашего хранилища;
* action - действие подлежащее обработке;
* */
export function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      // console.log('existing state: ' + JSON.stringify(state));
      // console.log('payload: ', action.payload);
      return {
        ...state,
        showProductCode: action.payload,
      };
    default:
      return state;
  }
}

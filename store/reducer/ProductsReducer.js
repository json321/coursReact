const initialState = {products: []}

function productsReducer(state = initialState, action) {
    let nextState
    switch (action.type) {

            case 'ADD_PRODUCT':
                nextState = {
                    ... state,
                    product: action.value 
                }
                return nextState
            case 'SET_ALL_PRODUCTS':
                nextState = {
                    ...state,
                    product: action.value
                }
                return nextState
            default:
                return state
    }
}

export default productsReducer
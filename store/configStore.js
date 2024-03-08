import { combineReducers } from 'redux'
import userReducer from './reducer/UserReducer'
import productsReducer from './reducer/ProductsReducer'
import panierReducer from './reducer/PanierReducer'
import {configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    userReducer,
    productsReducer,
    panierReducer
})

const store = configureStore({ reducer: rootReducer})

export default store
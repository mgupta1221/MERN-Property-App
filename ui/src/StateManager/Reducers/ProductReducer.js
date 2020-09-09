
import {
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCT_PENDING,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_ERROR
} from '../ActionCreators/ProductActionCreators';

const initialState = {
    pending: false,
    products: [],
    error: null
}

export function ProductsReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_PRODUCTS_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                pending: false,
                products: action
            }
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case FETCH_PRODUCT_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                pending: false,
                product: action.payload
            }
        case FETCH_PRODUCT_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }       
        default:
            return state;
    }
}

//Selectors
export const getProducts = state => state.products;
export const getProductsPending = state => state.pending;
export const getProductsError = state => state.error;

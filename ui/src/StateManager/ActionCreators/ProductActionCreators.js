export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';
export const FETCH_PRODUCT_PENDING = 'FETCH_PRODUCT_PENDING';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_ERROR = 'FETCH_PRODUCT_ERROR';

export function fetchProductListPending() {
    return {
        type: FETCH_PRODUCTS_PENDING
    }
}

export function fetchProductListSuccess(products) {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        products: products
    }
}

export function fetchProductListError(error) {
    return {
        type: FETCH_PRODUCTS_ERROR,
        error: error
    }
}


export function fetchProductPending() {
    return {
        type: FETCH_PRODUCT_PENDING
    }
}

export function fetchProductSuccess(product) {
    return {
        type: FETCH_PRODUCT_SUCCESS,
        payload: product
    }
}

export function fetchProductError(error) {
    return {
        type: FETCH_PRODUCT_ERROR,
        error: error
    }
}



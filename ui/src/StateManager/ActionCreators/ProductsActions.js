import {
    fetchProductListPending,
    fetchProductListSuccess,
    fetchProductListError,
    fetchProductPending,
    fetchProductSuccess,
    fetchProductError
} from './ProductActionCreators';
import * as Constants from '../../Common/Constants';

export const fetchProducts = (ExcludeMyProperty, userEmail) => {
    return dispatch => {
        dispatch(fetchProductListPending());
        
        var propertyURL = process.env.REACT_APP_GET_PROPERTIES_URL 
        var body = null;

        body = JSON.stringify({
            excludeMyProperty: ExcludeMyProperty,
            email: userEmail
        });
        fetch(propertyURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchProductListSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(fetchProductListError(error));
            })
    }
}
export const fetchProduct = (id) => {
    return dispatch => {
        dispatch(fetchProductPending());
        var propertyURL = process.env.REACT_APP_GET_PROPERTY_BY_ID
        fetch(propertyURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchProductSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(fetchProductError(error));
            })
    }
}

import Products from '../api/product.js';
import apiClient from '../api/http-common';
import pro from '../api/pro';

export const getProducts = () => {
    return async (dispatch) => {
        const Allproduct = await apiClient.get(`/v1/products/latest`)
            .then(res => res.data.products);
        dispatch(
            {
                type: "ACTUAL_PRODUCTS",
                products: Allproduct
            }
        )
    }
};

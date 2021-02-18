import { Thunk } from './../index';
import { Product } from './../../shared/Table/Table.mockdata';
import { getAllProducts } from './../../services/Products.service';
import { ProductCreator } from './../../components/Products/ProductForm';
import { Action } from '..';

export const insertNewProduct = (payload: ProductCreator): Action<ProductCreator> => {
    return {
        type: 'INSERT_NEW_PRODUCT',
        payload
    }
};

export const getProducts = (): Thunk<Product[]> => async (dispatch) => {
    const products = await getAllProducts();
    console.log('fetched');
    dispatch({
        type: 'FETCH_PRODUCTS',
        payload: products
    })
};
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RootState, ThunkDispatch } from '../../redux';
import * as ProductsAction from '../../redux/Products/Products.actions';
import Table, { TableHeader } from "../../shared/Table";
import { Product } from '../../shared/Table/Table.mockdata';
import ProductForm, { ProductCreator } from './ProductForm';

const headers: TableHeader[] = [
    { key: 'id', value: '#' },
    { key: 'name', value: 'Product' },
    { key: 'price', value: 'Price', right: true },
    { key: 'stock', value: 'Available Stock', right: true }
];

declare interface ProductsCRUDProp {
    products: Product[];
}

const ProductsCRUD: React.FC<ProductsCRUDProp> = (props) => {
    const dispatch: ThunkDispatch = useDispatch();
    const params = useParams<{ id?: string }>();
    const history = useHistory();
    const location = useLocation();
    const showErrorAlert = (err: Error) => Swal.fire('Oops!', err.message, 'error');
    const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(undefined);

    useEffect(() => {
        setUpdatingProduct(params.id ? props.products.find(product => product._id === params.id) : undefined)
    }, [params, props.products]);

    useEffect(() => {
        fetchData()
    }, []);

    async function fetchData() {
        dispatch(ProductsAction.getProducts())
            .catch(showErrorAlert);
    }

    const handleProductSubmit = async (product: ProductCreator) => {
        dispatch(ProductsAction.insertNewProduct(product))
            .catch(showErrorAlert);
    };

    const handleProductUpdate = async (newProduct: Product) => {
        dispatch(ProductsAction.updateProduct(newProduct))
            .then(() => setUpdatingProduct(undefined))
            .catch(showErrorAlert);
    };

    const handleProductDetail = (product: Product) => {
        Swal.fire(
            'Product details',
            `${product.name} cost $${product.price} and we have ${product.stock} available in stock.`,
            'info'
        )
    };

    const handleProductDelete = (product: Product) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#09f',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, delete ${product.name}!`
        }).then(({ value }) => value && deleteProduct(product._id))
    };

    const deleteProduct = async (id: string) => {
        dispatch(ProductsAction.deleteProduct(id))
            .then(() => Swal.fire('Uhul!', 'Product successfully deleted', 'success'))
            .catch(showErrorAlert);

    };

    return <>
        <Table headers={headers} data={props.products} enableActions onDelete={handleProductDelete} onDetail={handleProductDetail}
            onEdit={product => history.push({ pathname: `/products/${product._id}`, search: location.search })} itemsPerPage={3} />

        <ProductForm form={updatingProduct} onSubmit={handleProductSubmit} onUpdate={handleProductUpdate} />
    </>
};

const mapStateToProps = (state: RootState) => ({
    products: state.products
});

export default connect(mapStateToProps)(ProductsCRUD);
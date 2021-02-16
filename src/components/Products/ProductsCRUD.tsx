import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getProducts, insertNewProduct } from '../../redux/Products/Products.actions';
import { deleteSingleProduct, updateSingleProduct } from '../../services/Products.service';
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
    const dispatch = useDispatch();

    const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(undefined);

    async function fetchData() {
        dispatch(getProducts());
    }

    useEffect(() => {
        fetchData()
    }, []);

    const handleProductSubmit = async (product: ProductCreator) => {
        try {
            dispatch(insertNewProduct(product));
            fetchData();
        } catch (err) {
            Swal.fire('Oops!', err.message, 'error');
        }
    };

    const handleProductUpdate = async (newProduct: Product) => {
        try {
            await updateSingleProduct(newProduct);

            setUpdatingProduct(undefined);
            fetchData();
        } catch (err) {
            Swal.fire('Oops!', err.message, 'error');
        }
    };

    const handleProductEdit = (product: Product) => {
        setUpdatingProduct(product);
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
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(product._id);
            }
        })
    };

    const deleteProduct = async (id: string) => {
        try {
            await deleteSingleProduct(id);
            fetchData();
            Swal.fire('Uhul!', 'Product successfully deleted', 'success');
        } catch (err) {
            Swal.fire('Oops!', err.message, 'error');
        }
    };
    return <>
        <Table headers={headers} data={props.products} enableActions onDelete={handleProductDelete} onDetail={handleProductDetail} onEdit={handleProductEdit} />

        <ProductForm form={updatingProduct} onSubmit={handleProductSubmit} onUpdate={handleProductUpdate} />
    </>
};

const mapStateToProps = (state: any) => ({
    products: state.products
});

export default connect(mapStateToProps)(ProductsCRUD);
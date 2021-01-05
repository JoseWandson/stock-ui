import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { createSingleProduct, deleteSingleProduct, getAllProducts, updateSingleProduct } from '../../services/Products.service';
import Container from '../../shared/Container';
import Table, { TableHeader } from '../../shared/Table';
import { Product } from '../../shared/Table/Table.mockdata';
import Header from '../Header';
import ProductForm, { ProductCreator } from '../Products/ProductForm';
import './App.css';

const headers: TableHeader[] = [
  { key: 'id', value: '#' },
  { key: 'name', value: 'Product' },
  { key: 'price', value: 'Price', right: true },
  { key: 'stock', value: 'Available Stock', right: true }
];

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(products[0]);

  async function fetchData() {
    const _products = await getAllProducts();
    setProducts(_products);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductSubmit = async (product: ProductCreator) => {
    try {
      await createSingleProduct(product);
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

  return (
    <div className="App">
      <Header title="Stock" />

      <Container>
        <Table headers={headers} data={products} enableActions onDelete={handleProductDelete} onDetail={handleProductDetail} onEdit={handleProductEdit} />

        <ProductForm form={updatingProduct} onSubmit={handleProductSubmit} onUpdate={handleProductUpdate} />
      </Container>
    </div>
  );
}

export default App;

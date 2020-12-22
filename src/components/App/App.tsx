import React, { useState } from 'react';
import Container from '../../shared/Container';
import Table, { TableHeader } from '../../shared/Table';
import Products, { Product } from '../../shared/Table/Table.mockdata';
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
  const [products, setProducts] = useState(Products);
  const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(products[0]);
  const handleProductSubmit = (product: ProductCreator) => setProducts([
    ...products,
    {
      id: products.length + 1,
      ...product
    }
  ]);

  const handleProductUpdate = (newProduct: Product) => {
    setProducts(products.map(product => product.id === newProduct.id ? newProduct : product));

    setUpdatingProduct(undefined);
  };

  return (
    <div className="App">
      <Header title="Stock" />

      <Container>
        <Table headers={headers} data={products} enableActions onDelete={console.table} onDetail={console.table} onEdit={console.table} />

        <ProductForm form={updatingProduct} onSubmit={handleProductSubmit} onUpdate={handleProductUpdate} />
      </Container>
    </div>
  );
}

export default App;

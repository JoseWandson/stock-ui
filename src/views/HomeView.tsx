import React from 'react';
import Header from '../components/Header';
import ProductsCRUD from '../components/Products/ProductsCRUD';
import Container from '../shared/Container';

const HomeView = () => {
    return <>
        <Header title="Stock" />

        <Container>
            <ProductsCRUD />
        </Container>
    </>
};

export default HomeView;
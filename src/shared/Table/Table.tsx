import React from 'react';
// import './Table.scss';

const Table = () =>
    <table>
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Coockie</td>
                <td>$1.25</td>
                <td>23</td>
            </tr>
            <tr>
                <td>Milk 1L</td>
                <td>$0.99</td>
                <td>10</td>
            </tr>
        </tbody>
    </table>

export default Table;
import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux";
import { Product } from "../../shared/Table/Table.mockdata";
import './Header.css';

declare interface HeaderProps {
    title: string;
    firstProduct: Product;
}

const Header: React.FC<HeaderProps> = (props) => {
    return <header className="AppHeader">
        <h1>{props.title}</h1>
        <span>{props.firstProduct?.name}</span>
    </header>
}

const mapStateToProps = (state: RootState) => ({
    firstProduct: state.products[0]
})

export default connect(mapStateToProps)(Header);
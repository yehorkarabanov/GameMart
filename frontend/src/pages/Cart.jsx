import React from "react";
import {Footer} from "../components/Footer";
import {Header} from "../components/Header";
import {CartList} from "../components/CartList";

export const Cart = () => {
    return (
        <>
            <Header/>
            <CartList/>
            <Footer/>
        </>
    );

}
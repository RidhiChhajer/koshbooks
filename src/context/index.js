import React, { createContext, useContext, useState } from 'react';

const Cart = createContext();

const CartContext = ({ children }) => {
    const [ cart, setCart ] = useState({
        quantity: 0,
        total: 0,
        products: [],
    })
    return (
        <Cart.Provider
            value={{
                cart,
                setCart
            }}
        >
            {children}
        </Cart.Provider>
    )
}
export default CartContext;

export const CartState = () => {
    return useContext(Cart);
};
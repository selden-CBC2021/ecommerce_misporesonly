import React, { createContext, useContext, useState, useEffect } from "react";

import { toast } from 'react-hot-toast';


const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1)

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if(checkProductInCart) {
           const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
                return cartProduct
            })

            setCartItems(updatedCartItems);
            
        } else {
            product.quantity = quantity;

            setCartItems([ ...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`)
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id );
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity );
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id )
        index = cartItems.findIndex((product) => product._id === id)

        // const newCartItems = cartItems.filter((item) => item._id !== id)
        let newCartItems1 = cartItems.slice(0, index);
        let newCartItems2 = cartItems.slice(index + 1, cartItems.length);
        
        if(value === 'increase') {
          setCartItems([
              ...newCartItems1, { ...foundProduct, quantity: foundProduct.quantity + 1 },
              ...newCartItems2
           ]);
          setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if(value === 'decrease') {
            if(foundProduct.quantity > 1) {
                setCartItems([
                    ...newCartItems1, { ...foundProduct, quantity: foundProduct.quantity - 1 }, 
                    ...newCartItems2
                ]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1) 
            } 
        }
    }

    const increaseQty = () => {
        setQty((prevQty) => prevQty + 1)
    }
    const decreaseQty = () => {
        setQty((prevQty) => {
            if(prevQty  < 1) return 1;
            return prevQty -1
        })
    }
    
    // const initialCart = [];
    // const initialQuantity = 0;
 
    // /** This will persist the cart items **/
 
    // useEffect(() => {
    //    const cartData = JSON.parse(localStorage.getItem('cart'));
    //    if (cartData) {
    //       setCartItems(cartData);
    //    }
    // }, []);
 
    // useEffect(() => {
    //    if (cartItems !== initialCart) {
    //       localStorage.setItem('cart', JSON.stringify(cartItems));
    //    }
    // }, [newCartItems2]);
 
    // /** This will persist the quantity **/
 
    // useEffect(() => {
    //    const cartQuantity = JSON.parse(localStorage.getItem('quantity'));
    //    if (cartQuantity) {
    //       setTotalQuantities(cartQuantity);
    //    }
    // }, []);
 
    // useEffect(() => {
    //    if (totalQuantities !== initialQuantity) {
    //       localStorage.setItem('quantity', JSON.stringify(totalQuantities));
    //    }
    // }, [totalQuantities]);
 


    return (
        <Context.Provider 
            value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            increaseQty,
            decreaseQty,
            onAdd,
            setShowCart,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities
        }}
        >
        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);
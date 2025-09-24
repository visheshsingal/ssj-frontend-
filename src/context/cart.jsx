//TODO: fix clearcartItem

import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "./auth"; // assuming you have auth context

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const { auth } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [saveLaterItems, setSaveLaterItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            console.log("Fetching cart and save later items");
            if(auth?.token){
                try {
                    console.log("Making request to fetch cart and save later items");
                    const res = await axios.get(
                        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/cart-and-save-later`,
                        { headers: { Authorization: auth.token } }
                    );
                    console.log("Fetched cart and save later items:", res.data);
                    setCartItems(res.data.cart || []);
                    setSaveLaterItems(res.data.savedForLater||[]);
                } catch (err) {
                    console.log("Error fetching cart", err);
                }
            }
        };
        fetchCart();
    }, [auth?.token]);

    const updateServerCart = async ({ product, type, list, quantity, seller }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-cart-and-save-later`,
                { product, type, list, quantity, seller },
                { headers: { Authorization: auth.token } }
            );
            console.log("Updated cart/save later:", res.data);
            setCartItems(res.data.cart || []);
            setSaveLaterItems(res.data.savedForLater || []);
        } catch (err) {
            console.error(err);
            // toast.error("Something went wrong!");
        }
    };

    const addItems = async (product, quantity = 1) => {
        const isInCart = cartItems.find((item) => item.productId === product.productId);
        await updateServerCart({ product: product.productId, type: "add", list: "cart", quantity, seller: product.seller });
        // if(!isInCart)
        //     toast.success("Product Added To Cart", { style:{ top:"40px" } });
    };

    const removeItems = (product) => {
        updateServerCart({ product: product.productId, type: "remove", list: "cart" });
    };

    const addLater = (product) => {
        updateServerCart({ product: product.productId, type: "add", list: "savedForLater", seller: product.seller, quantity: product.quantity||1 });
        toast.success("Product Saved To Later", { style:{ top:"40px" } });
    };

    const moveToCart = (product) => {
        updateServerCart({ product: product.productId, type: "moveToCart", list: "savedForLater" });
        toast.success("Product moved to Cart", { style:{ top:"40px" } });
    };

    const removeLater = (product) => {
        updateServerCart({ product: product.productId, type: "remove", list: "savedForLater" });
    };

    const clearCartItems=async()=>{
         try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/clear-cart`,
                { headers: { Authorization: auth.token } }
            );
            console.log("Updated cart later:", res.data);
            setCartItems([]);
        } catch (err) {
            console.error(err);
            // toast.error("Something went wrong!");
        }
        
    }

    return (
        <CartContext.Provider value={[
            cartItems,
            clearCartItems,
            addItems,
            removeItems,
            saveLaterItems,
            addLater,
            moveToCart,
            removeLater,
        ]}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const c=useContext(CartContext);
    return c;
}

export { CartProvider, useCart };

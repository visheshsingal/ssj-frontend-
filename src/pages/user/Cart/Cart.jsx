/* eslint-disable no-unused-vars */
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useCart } from "../../../context/cart";
import SaveForLater from "./SaveForLater";
import ScrollToTopOnRouteChange from "./../../../utils/ScrollToTopOnRouteChange";
import SeoData from "../../../SEO/SeoData";
import PriceCard from "./PriceCard";
import { useAuth } from "../../../context/auth";
import axios from "axios";

const loadRazorpayScript = () =>
    new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

const Cart = () => {
    const { auth } = useAuth();
    //stripe details
    const publishKey = import.meta.env.VITE_STRIPE_PUBLISH_KEY;
    const secretKey = import.meta.env.VITE_STRIPE_SECRET_KEY;
    let frontendURL = window.location.origin; // Get the frontend URL
    const [cartItems, setCartItems, , , saveLaterItems] = useCart();

    // //PAYMENT USING STRIPE
    // const handlePayment = async () => {
    //     const stripe = await loadStripe(publishKey);

    //     const response = await axios.post(
    //         `${
    //             import.meta.env.VITE_SERVER_URL
    //         }/api/v1/user/create-checkout-session`,
    //         {
    //             products: cartItems,
    //             frontendURL: frontendURL,
    //             customerEmail: auth?.user?.email,
    //         },
    //         {
    //             headers: {
    //                 Authorization: auth?.token,
    //             },
    //         }
    //     );
    //     const session = response.data.session;
    //     console.log("session: ", session);
    //     //storing session id to retrieve payment details after successful
    //     localStorage.setItem("sessionId", session.id);
    //     const result = stripe.redirectToCheckout({
    //         sessionId: session.id,
    //     });
    //     console.log("result: ", result);

    //     if (result.error) {
    //         console.log(result.error);
    //     }
    // };


    const handlePayment = async () => {
        // load checkout lib
        const ok = await loadRazorpayScript();
        if (!ok) {
            //TODO add toast

            return alert("Failed to load Razorpay SDK. Try again.");
        }

        try {
            // 1) ask backend to create a Razorpay order (backend uses secret key)
            const createRes = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/create-order`,
                { products: cartItems },
                { headers: { Authorization: auth?.token } }
            );

            const { order } = createRes.data; // order.id, amount, currency
            // orderDBId optional if backend persisted draft order (not required)

            // 2) open Razorpay checkout modal
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // publishable key (frontend)
                amount: order.amount, // in paise
                currency: order.currency,
                name: "PointAll",
                description: "Order Payment",
                order_id: order.orderId, // razorpay order id
                prefill: {
                    name: order.name,       // user-friendly
                    email: order.email,     // required by Razorpay for receipts
                    contact: order.phone,   // optional, helps user checkout faster
                },
                notes: {
                    cart: JSON.stringify(cartItems.map(item => item.productId)), // track which products this payment is for
                     // your internal order ID
                    userId:order.userId   // user making the order
                },

                // Called on payment success inside the modal
                handler: async function (response) {
                    try {
                        // 3) verify payment on backend (server uses secret key)
                        await axios.post(
                            `${import.meta.env.VITE_SERVER_URL}/api/v1/user/payment-success`,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                products: cartItems, // optional, server may use this to create order record
                            },
                            { headers: { Authorization: auth?.token } }
                        );

                        // 4) redirect user to success page (include order id if you want)
                        window.location.href = `${frontendURL}/shipping/confirm`;
                    } catch (err) {
                        console.error("Verification failed:", err);
                        // redirect to failure page
                        window.location.href = `${frontendURL}/shipping/failed`;
                    }
                },

                // Called when user dismisses the modal (cancel)
                modal: {
                    ondismiss: function () {
                        // redirect the user to a cancel/checkout page
                        window.location.href = `${frontendURL}/shipping/failed`;
                    },
                },
                theme: { color: "#3399cc" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment init error:", error);
            //TODO add toast
            alert("Something went wrong while initiating payment. Try again.");
        }
    };

    const placeOrderHandler = () => {
        handlePayment();
    };

    return (
        <>
            <ScrollToTopOnRouteChange />
            <SeoData title="Shopping Cart | Flipkart.com" />
            <main className="w-full pt-5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 min-h-screen text-gray-100">
    <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto">
        {/* Cart column */}
        <div className="flex-1">
            {/* Cart items container */}
            <div className="flex flex-col shadow-xl bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-950/80 rounded-xl border border-gray-800">
                <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b border-gray-800 text-indigo-300">
                    My Cart ({cartItems?.length})
                </span>
                {cartItems?.length === 0 ? (
                    <EmptyCart />
                ) : (
                    cartItems?.map((item, i) => (
                        <CartItem
                            product={item}
                            inCart={true}
                            key={i}
                        />
                    ))
                )}
                {/* Place order btn */}
                <div className="flex flex-col sm:flex-row justify-between items-center sticky bottom-0 left-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 border-t border-gray-800 rounded-b-xl">
                    <div
                        className={`text-xs p-2 ${cartItems.length < 1
                            ? "hidden"
                            : "inline-block"
                            } w-full text-gray-400`}
                    >
                        <p>
                            For payment purposes, you can use the following test card details:
                        </p>
                        <ul>
                            <li>
                                <strong>Card Number:</strong> 4242 4242 4242 4242
                            </li>
                            <li>
                                <strong>Expiry Date:</strong> Any future date (e.g., 12/25)
                            </li>
                            <li>
                                <strong>CVV:</strong> Any 3-digit number (e.g., 123)
                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={placeOrderHandler}
                        disabled={cartItems.length < 1}
                        className={`${cartItems.length < 1
                            ? "hidden"
                            : "bg-gradient-to-r from-orange-600 to-yellow-500 border-2 border-yellow-400 hover:from-orange-700 hover:to-yellow-600"
                            } w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-4 font-medium text-white shadow hover:shadow-lg rounded-lg transition-all duration-300 group relative`}
                    >
                        <span className="absolute inset-0 rounded-lg pointer-events-none border-2 border-yellow-400 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_24px_4px_#fbbf24] transition-all duration-300"></span>
                        <span className="relative z-10">PLACE ORDER</span>
                    </button>
                </div>
            </div>
            {/* Saved for later items container */}
            <div className="flex flex-col mt-5 shadow-xl bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-950/80 rounded-xl border border-gray-800 mb-8">
                <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b border-gray-800 text-indigo-300">
                    Saved For Later ({saveLaterItems?.length})
                </span>
                {saveLaterItems?.map((item, i) => (
                    <SaveForLater product={item} key={i} />
                ))}
            </div>
        </div>
        {/* Price Card column */}
        <PriceCard cartItems={cartItems} />
    </div>
</main>
        </>
    );
};

export default Cart;

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useCart } from "../../../context/cart";
import { useAuth } from "../../../context/auth";
import Spinner from "./../../../components/Spinner";
import SeoData from "../../../SEO/SeoData";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState(3);
    const [cartItems, clearCartItems] = useCart();
    const { auth } = useAuth();
    const [loading, setLoading] = useState(true);

    // After order placement, remove items from cart and save details to the database
    useEffect(() => {
        const savePayment = async () => {
            try {
                setLoading(true);
                clearCartItems();
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        savePayment(); // <-- Call the function here!

    }, [auth?.token, cartItems, clearCartItems]);

    // Timer to redirect after 3 sec
    let intervalId = useRef(null);
    useEffect(() => {
        intervalId.current = setInterval(() => {
            if (!loading)
                setTime((prev) => {
                    let temp = prev - 1;
                    if (temp === 0) {
                        clearInterval(intervalId.current);
                        navigate("/user/orders");
                    }
                    return temp;
                });
        }, 1000);
        return () => clearInterval(intervalId.current);
    }, [loading, navigate]);

    return (
        <>
            <SeoData title={`Transaction Successful`} />
            <main className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4">
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="flex flex-col gap-4 items-center justify-center w-full max-w-lg mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 border border-gray-800 shadow-2xl rounded-2xl p-8 min-h-[50vh]">
                        <div className="flex gap-4 items-center">
                            <h1 className="text-2xl font-bold text-green-400">
                                Transaction Successful
                            </h1>
                            <CheckCircleOutlineIcon className="text-green-400" fontSize="large" />
                        </div>
                        <p className="mt-2 text-lg text-indigo-200 text-center">
                            Redirecting to orders in <span className="font-semibold text-yellow-400">{time}</span> sec
                        </p>
                        <Link
                            to="/user/orders"
                            className="bg-gradient-to-r from-green-600 to-indigo-500 hover:from-green-700 hover:to-indigo-600 text-white uppercase font-semibold py-2.5 px-8 rounded-lg shadow-lg transition-all text-base tracking-wide mt-2"
                        >
                            Go to Orders
                        </Link>
                    </div>
                )}
            </main>
        </>
    );
};

export default OrderSuccess;

import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import SearchIcon from "@mui/icons-material/Search";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useAuth } from "../../context/auth";
import SeoData from "../../SEO/SeoData";

const AdminOrders = () => {
    const {auth} = useAuth();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // fetch orders from server
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/user/admin-orders`,
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );
                if (response?.data?.orders) {
                    setOrders(response.data.orders);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [auth?.token]);

    return (
        <>
            <SeoData title="Admin Orders | Flipkart" />

            <main className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 px-4 sm:px-10 py-4 text-gray-100">
                <div className="flex gap-3.5 w-full">
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className="flex flex-col gap-3 w-full pb-5 overflow-hidden">
                            {/* searchbar */}
                            <form
                                // onSubmit={searchOrders}
                                className="flex items-center justify-between mx-auto w-[100%] sm:w-10/12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 border border-gray-800 rounded-lg mb-2 hover:shadow-md"
                            >
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="search"
                                    name="search"
                                    placeholder="Search your orders here"
                                    className="p-2 text-sm outline-none flex-1 rounded-l bg-gray-900 text-indigo-200"
                                />
                                <button
                                    type="submit"
                                    className="h-full text-sm px-1 sm:px-4 py-2.5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-r flex items-center gap-1"
                                >
                                    <SearchIcon sx={{ fontSize: "20px" }} />
                                    <p className="text-[10px] sm:text-[14px]">
                                        Search
                                    </p>
                                </button>
                            </form>
                            {/* search bar */}

                            {orders?.length === 0 && (
                                <div className="flex items-center flex-col gap-2 p-10 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-950/80 rounded-xl shadow-xl border border-gray-800">
                                    <img
                                        draggable="false"
                                        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                                        alt="Empty Orders"
                                        className="w-32 h-32 object-contain mb-2"
                                    />
                                    <span className="text-lg font-medium text-indigo-300">
                                        Sorry, no orders found
                                    </span>
                                    <p className="text-sm text-gray-400">Get some orders first</p>
                                </div>
                            )}

                            {orders
                                ?.map((order) => {
                                    const {
                                        _id,
                                        orderStatus,
                                        buyer,
                                        createdAt,
                                        paymentId,
                                        shippingInfo,
                                        amount,
                                        products,
                                    } = order;
                                    return products.map((item, index) => (
                                        <OrderItem
                                            item={item}
                                            key={index}
                                            orderId={_id}
                                            orderStatus={orderStatus}
                                            createdAt={createdAt}
                                            paymentId={paymentId}
                                            buyer={buyer}
                                            shippingInfo={shippingInfo}
                                            amount={amount}
                                        />
                                    ));
                                })
                                .reverse()}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default AdminOrders;

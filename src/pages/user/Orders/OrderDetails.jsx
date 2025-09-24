/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Tracker from "./Tracker";
import MinCategory from "../../../components/MinCategory";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import Spinner from "../../../components/Spinner";
import SeoData from "../../../SEO/SeoData";
import generateInvoice from "./generateInvoice";

const OrderDetails = () => {
    const params = useParams();
    const orderId = params.id;

    const [loading, setLoading] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const { auth } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/order-detail?orderId=${orderId}`,
                    {
                        headers: { Authorization: auth?.token },
                    }
                );
                if (response?.data?.orderDetails) {
                    setOrderDetails(...response.data.orderDetails);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [auth?.token, orderId]);

    const amount = orderDetails?.amount;
    const orderItems = orderDetails?.products;
    const buyer = orderDetails?.buyer;
    const paymentId = orderDetails?.paymentId;
    const shippingInfo = orderDetails?.shippingInfo;
    const createdAt = orderDetails?.createdAt;
    const orderStatus = orderDetails?.orderStatus;

    return (
        <>
            <SeoData title="Order Details | SSG" />

            <MinCategory />
            <main className="w-full h-[90vh] py-2 sm:py-8 bg-gray-900 text-gray-200 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                        <div className="flex flex-col sm:flex-row bg-gray-800 shadow rounded-sm min-w-full border border-gray-700">
                            <div className="sm:w-1/2 border-r border-gray-700">
                                <div className="flex flex-col gap-3 my-8 mx-10">
                                    <h3 className="text-md font-[600] text-indigo-300">
                                        Delivery Address
                                    </h3>
                                    <h4 className="font-medium text-gray-100">
                                        {buyer?.name}
                                    </h4>
                                    <p className="text-sm text-gray-300">{`${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state} - ${shippingInfo?.pincode}`}</p>
                                    <div className="flex gap-2 text-sm">
                                        <p className="font-medium text-gray-200">Email</p>
                                        <p className="text-gray-300">{buyer?.email}</p>
                                    </div>
                                    <div className="flex gap-2 text-sm">
                                        <p className="font-medium text-gray-200">
                                            Phone Number
                                        </p>
                                        <p className="text-gray-300">{shippingInfo?.phoneNo}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2">
                                <div className="flex flex-col gap-3 my-8 mx-10">
                                    <h3 className="text-md font-[600] text-indigo-300">
                                        More Actions
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={() => generateInvoice({orderItems, buyer, shippingInfo, createdAt})}
                                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-all"
                                        >
                                            Download Invoice
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {orderItems?.map((item) => {
                            const {_id, image, name, discountPrice, quantity, seller, price } = item;

                            return (
                                <div
                                    className="flex flex-col sm:flex-row min-w-full shadow rounded-sm bg-gray-800 border border-gray-700 px-2 py-5"
                                    key={_id}
                                >
                                    <div className="flex flex-col sm:flex-row sm:w-1/2 gap-2">
                                        <div className="w-full sm:w-32 h-20">
                                            <img
                                                draggable="false"
                                                className="h-full w-full object-contain"
                                                src={image}
                                                alt={name}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 overflow-hidden">
                                            <p className="text-sm text-gray-100">
                                                {name.length > 60
                                                    ? `${name.substring(0, 60)}...`
                                                    : name}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-2">
                                                Quantity: {quantity}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Seller: {seller?.name}
                                            </p>
                                            <span className="font-medium text-gray-100">
                                                ₹{(quantity * price).toLocaleString()}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                Payment Id: {paymentId}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                Order Date: {new Date(createdAt).toDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-full sm:w-1/2">
                                        <Tracker
                                            orderOn={createdAt}
                                            activeStep={
                                                orderStatus === "Delivered"
                                                    ? 3
                                                    : orderStatus === "Out For Delivery"
                                                        ? 2
                                                        : orderStatus === "Shipped"
                                                            ? 1
                                                            : 0
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </>
    );
};

export default OrderDetails;

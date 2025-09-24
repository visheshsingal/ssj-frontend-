/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/functions";

const OrderItem = ({
    item,
    orderId,
    orderStatus,
    createdAt,
    paymentId,
    buyer,
    shippingInfo,
    amount,
}) => {
    return (
        <Link
            to={`./order_details/${orderId}`}
            className="flex flex-col sm:flex-row items-start bg-gray-800 border border-gray-700 rounded gap-5 px-4 sm:px-8 py-5 hover:shadow-lg mx-2 sm:mx-10 transition-all duration-300"
        >
            {/* Image container */}
            <div className="w-full sm:w-32 h-20">
                <img
                    draggable="false"
                    className="h-full w-full object-contain"
                    src={item?.image}
                    alt={item?.name}
                />
            </div>

            {/* Order desc container */}
            <div className="flex flex-col sm:flex-row justify-between w-full">
                <div className="flex flex-col w-[300px] gap-1 overflow-hidden">
                    <p className="text-sm text-gray-100">
                        {item?.name.length > 40
                            ? `${item?.name.substring(0, 40)}...`
                            : item?.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Quantity: {item?.quantity}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row mt-1 sm:mt-0 gap-2 sm:gap-20 sm:w-1/2">
                    <p className="text-sm text-gray-100 w-[100px]">
                        ₹{(item?.price * item.quantity).toLocaleString()}
                    </p>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium flex items-center gap-1 w-[250px]">
                            {orderStatus === "Shipped" ? (
                                <>
                                    <span className="text-orange-400 pb-0.5">
                                        <CircleIcon sx={{ fontSize: "14px" }} />
                                    </span>
                                    Shipped
                                </>
                            ) : orderStatus === "Delivered" ? (
                                <>
                                    <span className="text-green-400 pb-0.5">
                                        <CircleIcon sx={{ fontSize: "14px" }} />
                                    </span>
                                    Delivered
                                </>
                            ) : orderStatus === "Out For Delivery" ? (
                                <>
                                    <span className="text-yellow-400 pb-0.5">
                                        <CircleIcon sx={{ fontSize: "14px" }} />
                                    </span>
                                    Out For Delivery
                                </>
                            ) : (
                                <>
                                    <span className="text-blue-400 pb-0.5">
                                        <CircleIcon sx={{ fontSize: "14px" }} />
                                    </span>
                                    Ordered on {formatDate(createdAt)}
                                </>
                            )}
                        </p>
                        {orderStatus === "Delivered" ? (
                            <p className="text-xs text-gray-300 ml-1">
                                Your item has been Delivered
                            </p>
                        ) : orderStatus === "Shipped" ? (
                            <p className="text-xs text-gray-300 ml-1">
                                Your item has been Shipped
                            </p>
                        ) : orderStatus === "Processed" ? (
                            <p className="text-xs text-gray-300 ml-1">
                                Seller has processed your order
                            </p>
                        ) : orderStatus === "Out For Delivery" ? (
                            <p className="text-xs text-gray-300 ml-1">
                                Your order is Out for Delivery
                            </p>
                        ) : (
                            <p className="text-xs text-gray-300 ml-1">
                                Your order has been placed
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {/* Order desc container */}
        </Link>
    );
};

export default OrderItem;

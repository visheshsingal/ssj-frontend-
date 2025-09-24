/* eslint-disable react/prop-types */
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/functions";

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
            className="flex flex-col sm:flex-row items-start bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-950/80 border border-gray-800 rounded-xl gap-5 px-4 sm:px-8 py-5 hover:shadow-lg mx-2 sm:mx-10 transition-all duration-300 text-gray-100"
        >
            {/* image container */}
            <div className="w-full sm:w-32 h-20">
                <img
                    draggable="false"
                    className="h-full w-full object-contain rounded"
                    src={item?.image}
                    alt={item?.name}
                />
            </div>
            {/* order desc container */}
            <div className="flex flex-col sm:flex-row justify-between w-full">
                <div className="flex flex-col w-[300px] gap-1 overflow-hidden">
                    <p className="text-sm text-indigo-200 font-medium">
                        {item?.name.length > 40
                            ? `${item?.name.substring(0, 40)}...`
                            : item?.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Quantity: {item?.quantity}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row mt-1 sm:mt-0 gap-2 sm:gap-20 sm:w-1/2">
                    <p className="text-sm w-[100px] text-indigo-300">
                        ₹{item?.price.toLocaleString()}
                    </p>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium flex items-center gap-1 w-[250px]">
                            {orderStatus === "Shipped" ? (
                                <>
                                    <span className="text-orange-300 pb-0.5">
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
                                    <span className="text-green-400 pb-0.5">
                                        <CircleIcon sx={{ fontSize: "14px" }} />
                                    </span>
                                    Out For Delivery
                                </>
                            ) : (
                                <>
                                    <span className="text-indigo-400 pb-0.5">
                                        <CircleIcon sx={{ fontSize: "14px" }} />
                                    </span>
                                    Order received on {formatDate(createdAt)}
                                </>
                            )}
                        </p>
                        {orderStatus === "Delivered" ? (
                            <p className="text-xs ml-1 text-green-400">
                                Item successfully delivered
                            </p>
                        ) : orderStatus === "Out For Delivery" ? (
                            <p className="text-xs ml-1 text-indigo-300">
                                Product is out for delivery
                            </p>
                        ) : orderStatus === "Shipped" ? (
                            <p className="text-xs ml-1 text-orange-300">
                                You have processed this order
                            </p>
                        ) : (
                            <p className="text-xs ml-1 text-gray-400">Order received</p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default OrderItem;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MinCategory from "../../components/MinCategory";
import axios from "axios";
import Tracker from "./../user/Orders/Tracker";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/auth";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SeoData from "../../SEO/SeoData";

const UpdateOrders = () => {
    const params = useParams();
    const orderId = params.id;

    const [loading, setLoading] = useState(false);
    const [UpdateOrders, setUpdateOrders] = useState([]);
    const [status, setStatus] = useState("");
    const { auth } = useAuth();
    const [reload, setReload] = useState(false);

    useEffect(() => {
        // fetch order detail from server
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/user/admin-order-detail?orderId=${orderId}`,
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );
                if (response?.data?.orderDetails) {
                    setUpdateOrders(...response.data.orderDetails);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [auth?.token, orderId, reload]);

    const amount = UpdateOrders?.amount;
    const orderItems = UpdateOrders?.products;
    const buyer = UpdateOrders?.buyer;
    const paymentId = UpdateOrders?.paymentId;
    const shippingInfo = UpdateOrders?.shippingInfo;
    const createdAt = UpdateOrders?.createdAt;
    const orderStatus = UpdateOrders?.orderStatus;

    const updateOrderSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.patch(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/user/update/order-status`,
                { status, orderId },
                {
                    headers: { Authorization: auth?.token },
                }
            );
            if (res.status === 200) {
                setReload(!reload);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <SeoData title="Order Details | Flipkart" />

            <MinCategory />
            <main className="w-full py-2 sm:py-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 min-h-screen text-gray-100">
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                            <div className="flex flex-col sm:flex-row bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-950/80 shadow rounded-xl min-w-full border border-gray-800">
                                <div className="sm:w-1/2 border-r border-gray-800">
                                    <div className="flex flex-col gap-3 my-8 mx-10">
                                        <h3 className="text-md font-[600] text-indigo-300">
                                            Delivery Address
                                        </h3>
                                        <h4 className="font-medium text-indigo-200">
                                            {buyer?.name}
                                        </h4>
                                        <p className="text-sm text-gray-300">{`${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state} - ${shippingInfo?.pincode}`}</p>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium text-indigo-300">Email</p>
                                            <p className="text-gray-300">{buyer?.email}</p>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium text-indigo-300">
                                                Phone Number
                                            </p>
                                            <p className="text-gray-300">{shippingInfo?.phoneNo}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <div className="flex flex-col gap-5 my-8 mx-10">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-md font-[600] text-indigo-300">
                                                Update Status
                                            </h3>
                                            <Link
                                                to="/admin/orders"
                                                className="ml-1 flex items-center gap-0 font-medium text-indigo-400 uppercase"
                                            >
                                                <ArrowBackIosIcon
                                                    sx={{ fontSize: "14px" }}
                                                />
                                                <span className="text-[12px]">
                                                    Go Back
                                                </span>
                                            </Link>
                                        </div>
                                        <div>
                                            <form
                                                onSubmit={
                                                    updateOrderSubmitHandler
                                                }
                                                className="flex flex-col gap-3 items-start justify-between"
                                            >
                                                <div className="flex gap-2">
                                                    <p className="text-sm font-medium text-indigo-300">
                                                        Current Status:
                                                    </p>
                                                    <p className="text-sm text-gray-300">
                                                        {orderStatus}
                                                    </p>
                                                </div>
                                                <FormControl
                                                    fullWidth
                                                    sx={{ marginTop: 1 }}
                                                >
                                                    <InputLabel id="order-status-select-label" sx={{ color: "#6366f1" }}>
                                                        Status
                                                    </InputLabel>
                                                    <Select
                                                        labelId="order-status-select-label"
                                                        id="order-status-select"
                                                        value={status}
                                                        label="Status"
                                                        onChange={(e) =>
                                                            setStatus(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-[50%] text-indigo-200"
                                                        sx={{
                                                            color: "#e0e7ef",
                                                            background: "#23272f",
                                                            borderRadius: 2,
                                                        }}
                                                    >
                                                        <MenuItem
                                                            value={"Shipped"}
                                                        >
                                                            Shipped
                                                        </MenuItem>

                                                        <MenuItem
                                                            value={
                                                                "Out For Delivery"
                                                            }
                                                        >
                                                            Out For Delivery
                                                        </MenuItem>

                                                        <MenuItem
                                                            value={"Delivered"}
                                                        >
                                                            Delivered
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <button
                                                    type="submit"
                                                    className="bg-gradient-to-r from-orange-600 to-yellow-500 border-2 border-yellow-400 hover:from-orange-700 hover:to-yellow-600 px-4 py-2 text-[14px] text-white hover:font-medium rounded shadow hover:shadow-lg transition-all duration-300"
                                                >
                                                    Update
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {orderItems?.map((item) => {
                                const {
                                    _id,
                                    image,
                                    name,
                                    discountPrice,
                                    price,
                                    quantity,
                                    seller,
                                } = item;

                                return (
                                    <div
                                        className="flex flex-col sm:flex-row min-w-full shadow rounded-xl bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-950/80 px-2 py-5 border border-gray-800"
                                        key={_id}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:w-1/2 gap-2">
                                            <div className="w-full sm:w-32 h-20">
                                                <img
                                                    draggable="false"
                                                    className="h-full w-full object-contain rounded"
                                                    src={image}
                                                    alt={name}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 overflow-hidden">
                                                <p className="text-sm text-indigo-200 font-medium">
                                                    {name.length > 60
                                                        ? `${name.substring(
                                                              0,
                                                              60
                                                          )}...`
                                                        : name}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-2">
                                                    Quantity: {quantity}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Seller: {seller?.name}
                                                </p>
                                                <span className="font-medium text-indigo-300">
                                                    ₹
                                                    {(
                                                        quantity * (price-discountPrice)
                                                    ).toLocaleString()}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    Payment Id: {paymentId}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col w-full sm:w-1/2">
                                            <Tracker
                                                orderOn={createdAt}
                                                activeStep={
                                                    orderStatus === "Delivered"
                                                        ? 3
                                                        : orderStatus ===
                                                          "Out For Delivery"
                                                        ? 2
                                                        : orderStatus ===
                                                          "Shipped"
                                                        ? 1
                                                        : 0
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </main>
        </>
    );
};

export default UpdateOrders;

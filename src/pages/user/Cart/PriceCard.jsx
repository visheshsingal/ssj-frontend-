/* eslint-disable react/prop-types */
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const PriceCard = ({ cartItems }) => {
    return (
        <div className="flex sticky top-16 sm:h-screen flex-col sm:w-4/12 sm:px-1">
            {/* Card */}
            <div className="flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-xl shadow-xl border border-gray-700">
                <h1 className="px-6 py-3 border-b border-gray-800 font-semibold text-indigo-300">
                    PRICE DETAILS
                </h1>
                <div className="flex flex-col gap-4 p-6 pb-3">
                    <p className="flex justify-between text-gray-200">
                        Price ({cartItems?.length} item)
                        <span>
                            ₹
                            {cartItems
                                .reduce(
                                    (sum, item) =>
                                        sum +
                                        (item.price - item.discountPrice) * item.quantity,
                                    0
                                )
                                .toLocaleString()}
                        </span>
                    </p>
                    <p className="flex justify-between">
                        Discount
                        <span className="text-green-400 font-semibold">
                            - ₹
                            {cartItems
                                .reduce(
                                    (sum, item) =>
                                        sum +
                                        item.discountPrice * item.quantity,
                                    0
                                )
                                .toLocaleString()}
                        </span>
                    </p>
                    <p className="flex justify-between">
                        Delivery Charges
                        <span className="text-green-400 font-semibold">FREE</span>
                    </p>
                    <div className="border border-dashed border-gray-700"></div>
                    <p className="flex justify-between text-lg font-bold text-indigo-200">
                        Total Amount
                        <span>
                            ₹
                            {cartItems
                                .reduce(
                                    (sum, item) =>
                                        sum +
                                        (item.price - item.discountPrice) * item.quantity,
                                    0
                                )
                                .toLocaleString()}
                        </span>
                    </p>
                    <div className="border border-dashed border-gray-700"></div>
                    <p className="font-medium text-green-400">
                        You will save ₹
                        {cartItems
                            .reduce(
                                (sum, item) =>
                                    sum +
                                    item.discountPrice * item.quantity,
                                0
                            )
                            .toLocaleString()}{" "}
                        on this order
                    </p>
                </div>
            </div>
            <div className="flex gap-3 items-center my-4 p-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 rounded-lg border border-gray-800 shadow">
                <VerifiedUserIcon className="text-indigo-400" />
                <p className="text-gray-400 w-full text-[14px] font-[500]">
                    Safe and Secure Payments. Easy returns. 100% Authentic products.
                </p>
            </div>
        </div>
    );
};

export default PriceCard;

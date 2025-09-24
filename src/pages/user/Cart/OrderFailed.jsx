import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SeoData from "../../../SEO/SeoData";

const OrderFailed = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState(3);

    useEffect(() => {
        if (time === 0) {
            navigate("/cart");
            return;
        }
        const intervalId = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line
    }, [time]);

    return (
        <>
            <SeoData title={`Transaction Failed`} />

            <main className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4">
                <div className="flex flex-col gap-4 items-center justify-center w-full max-w-lg mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 border border-gray-800 shadow-2xl rounded-2xl p-8 min-h-[50vh]">
                    <div className="flex gap-4 items-center">
                        <h1 className="text-2xl font-bold text-red-400">
                            Transaction Failed
                        </h1>
                        <ErrorOutlineIcon className="text-red-500" fontSize="large" />
                    </div>
                    <p className="mt-2 text-lg text-indigo-200 text-center">
                        Redirecting to cart in{" "}
                        <span className="font-semibold text-yellow-400">{time}</span> sec
                    </p>
                    <Link
                        to="/cart"
                        className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white uppercase font-semibold py-2.5 px-8 rounded-lg shadow-lg transition-all text-base tracking-wide mt-2"
                    >
                        Go to Cart
                    </Link>
                </div>
            </main>
        </>
    );
};

export default OrderFailed;

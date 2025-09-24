import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import { MdLogout } from "react-icons/md";
import { FiMail, FiPhone } from "react-icons/fi";

const Deactivate = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const { auth, setAuth, LogOut } = useAuth();

    const handleDeactivate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/deactivate`,
                {
                    email,
                    phone,
                }
            );
            if (response.status === 200) {
                toast.success(response.data.message);
                LogOut();
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            error.response?.status === 401 &&
                error.response.data?.errorType === "phoneMismatch" &&
                toast.error(error.response.data.message);
        }
    };
    return (
        <>
            <ScrollToTopOnRouteChange />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-4 px-2">
                <div className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-0 flex flex-col md:flex-row gap-0 md:gap-0 overflow-hidden">
                    {/* Info Side */}
                    <div className="md:w-1/2 p-6 flex flex-col justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 mb-2">
                                <MdLogout className="text-red-400 text-2xl" />
                                <span className="text-xl font-bold text-red-400">
                                    Deactivate Account
                                </span>
                            </div>
                            <div className="text-base font-semibold text-indigo-200 mb-2">
                                When you deactivate your account
                            </div>
                            <ul className="list-disc pl-5 text-sm text-gray-400 leading-7">
                                <li>You are logged out of your Flipkart Account</li>
                                <li>Your public profile on Flipkart is no longer visible</li>
                                <li>
                                    Your reviews/ratings are still visible, while your profile information is shown as ‘unavailable’ as a result of deactivation.
                                </li>
                                <li>
                                    Your wishlist items are no longer accessible through the associated public hyperlink. Wishlist is shown as ‘unavailable’ as a result of deactivation
                                </li>
                                <li>
                                    You will be unsubscribed from receiving promotional emails from Flipkart
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Form Side */}
                    <div className="md:w-1/2 flex flex-col gap-6 items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
                        <div className="w-full font-semibold text-lg text-center text-indigo-200 mb-2">
                            Are you sure you want to leave?
                        </div>
                        <form
                            action="/deactivate"
                            method="post"
                            onSubmit={handleDeactivate}
                            className="flex flex-col gap-4 items-center w-full"
                        >
                            <div className="relative w-full">
                                <span className="absolute left-3 top-2.5 text-indigo-400">
                                    <FiMail size={18} />
                                </span>
                                <input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Confirm Your Email Address"
                                    className="pl-10 pr-3 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                    required
                                />
                            </div>
                            <div className="relative w-full">
                                <span className="absolute left-3 top-2.5 text-indigo-400">
                                    <FiPhone size={18} />
                                </span>
                                <input
                                    type="tel"
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="pl-10 pr-3 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    minLength="10"
                                    maxLength="10"
                                    placeholder="Confirm Your Mobile Number"
                                    required
                                />
                            </div>
                            <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold py-2.5 rounded-lg shadow-lg transition-all uppercase tracking-wide text-base">
                                Deactivate
                            </button>
                        </form>
                        <Link
                            to="/user/dashboard"
                            className="uppercase text-indigo-400 hover:text-indigo-300 font-semibold text-sm flex items-center justify-center w-full transition"
                        >
                            No, Let me Stay
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Deactivate;

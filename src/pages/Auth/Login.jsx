import { useEffect, useState } from "react";
import authImg from "../../assets/images/auth.png";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FiMail, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/auth";
import Spinner from "../../components/Spinner";
import Cookies from "js-cookie";
import SeoData from "../../SEO/SeoData";

const Login = () => {
    //hooks->
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { auth, setAuth, isAdmin } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (auth.token) {
            isAdmin
                ? navigate("/admin/dashboard")
                : navigate("/user/dashboard");
        }
    }, [navigate, auth, isAdmin]);

    //form submission handler
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            toast(
                "The backend is starting up, please wait for a minute if the loader is visible."
            );

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/login`,
                {
                    email,
                    password,
                }
            );

            if (response.status === 200) {
                toast.success("Logged in Successfully!");
                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.token,
                });

                Cookies.set("auth", JSON.stringify(response.data), {
                    expires: 7,
                });
                navigate(location.state || "/");
            }
        } catch (error) {
            console.error("Error:", error);
            // invalid password
            error.response?.status === 401 &&
                error.response.data?.errorType === "invalidPassword" &&
                toast.error("Wrong password!");
            //user not registered
            error.response?.status === 401 &&
                error.response.data?.errorType === "invalidUser" &&
                toast.error("User not Registered!");
            //server error
            error.response?.status === 500 &&
                toast.error(
                    "Something went wrong! Please try after sometime."
                ) &&
                navigate("/login");
        } finally {
            setIsSubmitting(false);
        }
    };

    // display content
    return (
        <>
            <SeoData
                title="Log in - Existing User"
                description="Log in with user details"
            />
            {isSubmitting ? (
                <Spinner />
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-4 px-2">
                    <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-0 flex flex-col md:flex-row gap-0 md:gap-0 overflow-hidden">
                        {/* Left Side (Image/Brand) */}
                        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-8">
                            <img
                                src="/logo-10.png"
                                className="w-24 h-24 object-cover rounded-full border-[1px] border-indigo-500 shadow mb-4"
                                alt="logo"
                            />
                            <h2 className="text-3xl font-bold text-indigo-300 mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-base text-gray-400 text-center mb-6">
                                Log in to access your Orders, Wishlist and Recommendations
                            </p>
                            <img
                                src="/login-anim.gif"
                                alt="auth"
                                className="w-56 h-56 object-contain"
                            />
                        </div>
                        {/* Right Side (Form) */}
                        <div className="flex-1 flex flex-col justify-center p-6 sm:p-10">
                            {/* Logo for mobile */}
                            <div className="flex flex-col items-center gap-2 md:hidden mb-4">
                                <img
                                    src="/logo-10.png"
                                    className="w-20 h-20 object-cover rounded-full border-[1px] border-indigo-500 shadow"
                                    alt="logo"
                                />
                                <h2 className="text-2xl font-bold text-indigo-300 mt-2">
                                    Welcome Back
                                </h2>
                                <p className="text-sm text-gray-400 text-center">
                                    Log in to access your Orders, Wishlist and Recommendations
                                </p>
                            </div>
                            {/* Auth image for mobile */}
                            <div className="flex justify-center md:hidden mb-4">
                                <img
                                    src="/login-anim.gif"
                                    alt="auth"
                                    className="w-32 h-32 object-contain"
                                />
                            </div>
                            {/* Login Form */}
                            <form
                                action="/login"
                                method="post"
                                className="flex flex-col gap-5"
                                onSubmit={handleFormSubmit}
                            >
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-indigo-400">
                                        <FiMail size={18} />
                                    </span>
                                    <input
                                        autoComplete="on"
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 pr-3 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                        placeholder="Email address"
                                        required
                                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                    />
                                </div>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-indigo-400">
                                        <FiLock size={18} />
                                    </span>
                                    <input
                                        autoComplete="off"
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                        placeholder="Password"
                                        required
                                        minLength="5"
                                    />
                                    <span
                                        className="absolute right-3 top-2.5 text-indigo-400 hover:text-indigo-300 cursor-pointer"
                                        onClick={handlePasswordToggle}
                                    >
                                        {!showPassword ? (
                                            <AiFillEye size={18} />
                                        ) : (
                                            <AiFillEyeInvisible size={18} />
                                        )}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 text-center">
                                    By continuing, you agree to SSG&apos;s Terms of Use and Privacy Policy.
                                </div>
                                <button
                                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-400 hover:from-indigo-700 hover:to-indigo-500 text-white font-semibold py-2.5 rounded-lg shadow-lg transition-all uppercase tracking-wide text-base"
                                    type="submit"
                                >
                                    Log in
                                </button>
                            </form>
                            <div className="flex flex-col gap-2 mt-4">
                                <Link
                                    to="/forgot-password"
                                    className="text-indigo-400 hover:text-indigo-300 text-xs text-center font-medium transition"
                                >
                                    Forgot Password?
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-indigo-400 hover:text-indigo-300 text-xs text-center font-medium transition"
                                >
                                    New to SSG? Create an account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;

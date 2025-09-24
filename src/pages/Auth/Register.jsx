//TODO: maintain otp time status in local storage

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import SeoData from "../../SEO/SeoData";

const OTP_TIMER = 100; // 5 minutes in seconds

const Register = () => {
    const [step, setStep] = useState(1); // 1: email/otp, 2: rest of form
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSeller, setIsSeller] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    // Timer effect: always runs if timer > 0
    useEffect(() => {
        if (otpSent && timer > 0) {
            timerRef.current = setTimeout(() => setTimer((t) => t - 1), 1000);
        }
        return () => clearTimeout(timerRef.current);
    }, [timer, otpSent]);

    // Send OTP handler
    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!email) return;
        setOtpLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/send-otp`, { email });
            toast.success("OTP sent to your email!");
            setOtpSent(true);
            setTimer(OTP_TIMER); // Always reset timer on new OTP
            setStep(2); // Always go to step 2 after sending OTP
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Failed to send OTP. Try again."
            );
        } finally {
            setOtpLoading(false);
        }
    };

    // Resend OTP handler
    const handleResendOtp = async () => {
        setOtpLoading(true);
        try {
            // await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/send-otp`, { email });
            // toast.success("OTP resent to your email!");
            setOtpSent(true);
            setTimer(OTP_TIMER); // Reset timer
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Failed to resend OTP. Try again."
            );
        } finally {
            setOtpLoading(false);
        }
    };

    // Register handler
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (password !== confirmPassword) {
                toast.error("Password does not match!");
                setIsSubmitting(false);
                return;
            }
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/register`,
                {
                    name,
                    email,
                    phone,
                    password,
                    isSeller,
                    otp,
                }
            );
            response.status === 201 &&
                toast.success("User Registered Successfully! Please Login...") &&
                navigate("/login");
            response.status === 200 &&
                toast.error("Email is already registered! Please Login...") &&
                navigate("/login");
        } catch (error) {
            error.response?.status === 500 &&
                toast.error("Something went wrong! Please try after sometime.") &&
                navigate("/register");
            error.response?.status === 400 &&
                toast.error(
                    error.response?.data?.message ||
                        "Invalid OTP. Please try again."
                );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Format timer as mm:ss
    const formatTimer = (t) => {
        const m = Math.floor(t / 60)
            .toString()
            .padStart(2, "0");
        const s = (t % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // Toggle password visibility
    const handlePasswordToggle = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <SeoData
                title="Sign up - New User"
                description="Register new user with details"
            />
            {(isSubmitting || otpLoading) ? (
                <Spinner />
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-4 px-2">
                    <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-0 flex flex-col md:flex-row gap-0 md:gap-0 overflow-hidden">
                        {/* Left Side (Info/Brand) */}
                        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-8">
                            <img
                                src="/logo-10.png"
                                className="w-24 h-24 object-cover rounded-full border-[1px] border-indigo-500 shadow mb-4"
                                alt="logo"
                            />
                            <h2 className="text-3xl font-bold text-indigo-300 mb-2">
                                Looks like you&apos;re new here!
                            </h2>
                            <p className="text-base text-gray-400 text-center mb-6">
                                Sign up with the required details to get started
                            </p>
                            <img
                                src="/register-11.gif"
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
                                    Looks like you&apos;re new here!
                                </h2>
                                <p className="text-sm text-gray-400 text-center">
                                    Sign up with the required details to get started
                                </p>
                            </div>
                            {/* Auth image for mobile */}
                            <div className="flex justify-center md:hidden mb-4">
                                <img
                                    src="/register-11.gif"
                                    alt="auth"
                                    className="w-32 h-32 object-contain"
                                />
                            </div>
                            {/* Register Form */}
                            {step === 1 ? (
                                <form
                                    action="/register"
                                    method="post"
                                    className="flex flex-col gap-5"
                                    onSubmit={handleSendOtp}
                                >
                                    <div className="relative">
                                        <input
                                            autoComplete="on"
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-4 pr-3 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                            placeholder="Email address"
                                            required
                                            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                        />
                                    </div>
                                    <button
                                        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-400 hover:from-indigo-700 hover:to-indigo-500 text-white font-semibold py-2.5 rounded-lg shadow-lg transition-all uppercase tracking-wide text-base"
                                        type="submit"
                                        disabled={otpSent && timer > 0}
                                    >
                                        {otpSent && timer > 0
                                            ? `Resend OTP in ${formatTimer(timer)}`
                                            : "Send OTP"}
                                    </button>
                                    {/* Show timer and resend in step 1 if OTP sent */}
                                    {otpSent && (
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-xs text-gray-400">
                                                {timer > 0
                                                    ? `Resend OTP in ${formatTimer(timer)}`
                                                    : (
                                                        <button
                                                            type="button"
                                                            className="text-indigo-400 hover:text-indigo-300 font-medium transition text-xs"
                                                            onClick={handleResendOtp}
                                                        >
                                                            Resend OTP
                                                        </button>
                                                    )}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-2 mt-4">
                                        <Link
                                            to="/login"
                                            className="text-indigo-400 hover:text-indigo-300 text-xs text-center font-medium transition"
                                        >
                                            Existing User? Log in
                                        </Link>
                                    </div>
                                </form>
                            ) : (
                                <form
                                    action="/register"
                                    method="post"
                                    className="flex flex-col gap-5"
                                    onSubmit={handleFormSubmit}
                                >
                                    {/* Back button */}
                                    <button
                                        type="button"
                                        className="mb-2 w-fit flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-xs font-medium transition"
                                        onClick={() => setStep(1)}
                                    >
                                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                                        Back
                                    </button>
                                    <div className="relative">
                                        <input
                                            autoComplete="on"
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="pl-4 pr-3 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                            placeholder="Full Name"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            autoComplete="on"
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={email}
                                            disabled
                                            className="pl-4 pr-3 py-2 w-full rounded-lg bg-gray-800 border border-gray-700 text-indigo-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base cursor-not-allowed opacity-80"
                                            placeholder="Email address"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            autoComplete="on"
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="pl-4 pr-3 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                            placeholder="Mobile Number"
                                            required
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            minLength="10"
                                            maxLength="10"
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            autoComplete="off"
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-4 pr-10 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
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
                                    <div className="relative">
                                        <input
                                            autoComplete="off"
                                            id="confirm_password"
                                            name="confirm_password"
                                            type={showPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="pl-4 pr-10 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                            placeholder="Confirm Password"
                                            required
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
                                    <div className="relative">
                                        <input
                                            autoComplete="on"
                                            id="otp"
                                            name="otp"
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="pl-4 pr-3 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                            placeholder="Enter OTP sent to your email"
                                            required
                                            pattern="[0-9]{6}"
                                            maxLength="6"
                                        />
                                        {/* Resend OTP */}
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-xs text-gray-400">
                                                {timer > 0
                                                    ? `Resend OTP in ${formatTimer(timer)}`
                                                    : (
                                                        <button
                                                            type="button"
                                                            className="text-indigo-400 hover:text-indigo-300 font-medium transition text-xs"
                                                            onClick={handleResendOtp}
                                                        >
                                                            Resend OTP
                                                        </button>
                                                    )}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-400 hover:from-indigo-700 hover:to-indigo-500 text-white font-semibold py-2.5 rounded-lg shadow-lg transition-all uppercase tracking-wide text-base"
                                        type="submit"
                                    >
                                        Register
                                    </button>
                                    <div className="flex flex-col gap-2 mt-4">
                                        <Link
                                            to="/login"
                                            className="text-indigo-400 hover:text-indigo-300 text-xs text-center font-medium transition"
                                        >
                                            Existing User? Log in
                                        </Link>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Register;

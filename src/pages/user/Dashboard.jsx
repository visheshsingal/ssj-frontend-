import { Route, Routes, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import UserProfile from "../UserProfile";
import AddressComponent from "../AddressComponent";
import PanCardComponent from "../PanCardComponent";
import Deactivate from "../Auth/Deactivate";
import Reviews from "./Reviews";
import PaymentCards from "./PaymentCards";
import SeoData from "../../SEO/SeoData";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";

const DeliveryAgentDashboard = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (window.location.pathname === "/user/dashboard")
            navigate("./profile");
    }, [navigate]);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    return (
        <>
            <SeoData title="User Dashboard" />
            <main className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 pt-2 pb-8 text-gray-100">
                <div className="flex items-start justify-between text-[14px] px-2 sm:px-[50px] py-2 sm:py-[40px] gap-5">
                    <div
                        className={`sm:w-[30%] ${
                            isMenuOpen
                                ? "w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 border border-gray-800 rounded-xl shadow-xl relative"
                                : "hidden"
                        } sm:inline-block`}
                    >
                        <UserMenu toggleMenu={toggleMenu} />
                    </div>
                    <div
                        className={`w-full sm:w-[70%] bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-950/80 shadow-md rounded-xl border border-gray-800 ${
                            isMenuOpen ? "hidden" : "block"
                        }`}
                    >
                        <button
                            onClick={toggleMenu}
                            className="sm:hidden text-indigo-400 underline rounded px-2 text-lg py-2"
                        >
                            {isMenuOpen ? "Close" : <GiHamburgerMenu />}
                        </button>
                        <Routes>
                            <Route path="profile" element={<UserProfile />} />
                            <Route path="address" element={<AddressComponent />} />
                            <Route path="pan" element={<PanCardComponent />} />
                            <Route path="payment-cards" element={<PaymentCards />} />
                            <Route path="user-review" element={<Reviews />} />
                            <Route path="profile/deactivate" element={<Deactivate />} />
                        </Routes>
                    </div>
                </div>
            </main>
        </>
    );
};

export default DeliveryAgentDashboard;

import { useAuth } from "../../context/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { GiCrossMark } from "react-icons/gi";

const UserMenu = ({ toggleMenu }) => {
    const { auth, setAuth, LogOut } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/");
        LogOut();
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 p-3 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-xl shadow border border-gray-800 relative">
                <img
                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
                    alt="user svg"
                    className="w-12 h-12 rounded-full border border-gray-700 bg-gray-800"
                />
                <div className="flex flex-col justify-center p-1">
                    <div className="text-[14px] text-gray-400">Hello,</div>
                    <div className="font-[600] text-[16px] text-indigo-200">
                        {auth?.user?.name}
                    </div>
                </div>
                <div
                    className="hover:scale-[1.06] absolute right-4 top-2 cursor-pointer sm:hidden text-indigo-400"
                    onClick={toggleMenu}
                >
                    <GiCrossMark />
                </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 flex flex-col justify-center rounded-xl shadow border border-gray-800">
                <div className="flex flex-col justify-center border-b border-gray-800">
                    <div className="flex flex-row items-center gap-6 pl-[10px] py-[8px]">
                        <PersonIcon className="text-indigo-400 text-[16px]" />
                        <div className="font-[600] text-[14px] text-indigo-300">
                            ACCOUNT SETTINGS
                        </div>
                    </div>
                    <div className="flex flex-col font-[300] text-[14px] mb-2 mt-0 text-gray-100">
                        <NavLink
                            to="./profile"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-indigo-400 bg-gray-800"
                                    : ""
                            }
                        >
                            <div className="h-[40px] px-[60px] flex items-center hover:text-indigo-400 hover:bg-gray-800 rounded">
                                Profile Information
                            </div>
                        </NavLink>
                        <NavLink
                            to="./address"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-indigo-400 bg-gray-800"
                                    : ""
                            }
                        >
                            <div className="h-[40px] px-[60px] flex items-center hover:text-indigo-400 hover:bg-gray-800 rounded">
                                Manage Addresses
                            </div>
                        </NavLink>
                        {/* <NavLink
                            to="./pan"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-indigo-400 bg-gray-800"
                                    : ""
                            }
                        >
                            <div className="h-[40px] px-[60px] flex items-center hover:text-indigo-400 hover:bg-gray-800 rounded">
                                Pan Card
                            </div>
                        </NavLink> */}
                    </div>
                </div>

                <div className="flex flex-col justify-center border-b border-gray-800">
                    <div className="flex flex-row items-center gap-6 pl-[10px] py-[8px]">
                        <BarChartIcon className="text-indigo-400 text-[16px]" />
                        <div className="font-[600] text-[14px] text-indigo-300">
                            DASHBOARD
                        </div>
                    </div>
                    <div className="flex flex-col font-[300] text-[14px] mb-2 mt-0 text-gray-100">
                        <NavLink
                            to="/user/orders"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-indigo-400 bg-gray-800"
                                    : ""
                            }
                        >
                            <div className="h-[40px] px-[60px] flex items-center hover:text-indigo-400 hover:bg-gray-800 rounded">
                                My Orders
                            </div>
                        </NavLink>
                        <NavLink
                            to="/user/wishlist"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-indigo-400 bg-gray-800"
                                    : ""
                            }
                        >
                            <div className="h-[40px] px-[60px] flex items-center hover:text-indigo-400 hover:bg-gray-800 rounded">
                                My Wishlist
                            </div>
                        </NavLink>
                        {/* <NavLink
                            to="./payment-cards"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-indigo-400 bg-gray-800"
                                    : ""
                            }
                        >
                            <div className="h-[40px] px-[60px] flex items-center hover:text-indigo-400 hover:bg-gray-800 rounded">
                                Saved Cards
                            </div>
                        </NavLink> */}
                        <NavLink
                            to="./user-review"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-indigo-400 bg-gray-800"
                                    : ""
                            }
                        >
                            <div className="h-[40px] px-[60px] flex items-center hover:text-indigo-400 hover:bg-gray-800 rounded">
                                My Reviews
                            </div>
                        </NavLink>
                    </div>
                </div>

                <div className="flex flex-col justify-center border-b border-gray-800">
                    <div className="flex flex-row items-center gap-6 pl-[10px] py-[8px] group">
                        <PowerSettingsNewIcon className="text-indigo-400 text-[16px]" />
                        <button
                            className="font-[600] text-[14px] w-full h-[40px] flex items-center text-indigo-300 group-hover:text-indigo-400"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-2 p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-xl shadow border border-gray-800 mt-2">
                    <span className="text-xs font-medium text-indigo-300">
                        Frequently Visited:
                    </span>
                    <div className="flex gap-2.5 text-xs text-gray-400">
                        <Link to="/forgot-password">Change Password</Link>
                        <Link to="/user/orders">Track Order</Link>
                        <Link to="/">Help Center</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;

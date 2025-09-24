/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiHomeSmile } from "react-icons/bi";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { BsCart2, BsBox } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLogin, MdLogout } from "react-icons/md";
import { useAuth } from "../../context/auth";
import SearchBar from "./SearchBar";
import { useCart } from "../../context/cart";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const headerRef = useRef(null);

  const { auth, LogOut } = useAuth();
  const [cartItems] = useCart();

  let closeTimeout;
  const toggleDropdown = () => {
    clearTimeout(closeTimeout);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    closeTimeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  const handleLogout = () => {
    LogOut();
  };

  const handleStickyHeader = () => {
    if (
      document.body.scrollTop > 0 ||
      document.documentElement.scrollTop > 0
    ) {
      headerRef.current.classList.add("backdrop-blur-md", "bg-[#54B1CE]/40", "shadow-lg");
    } else {
      headerRef.current.classList.remove("backdrop-blur-md", "bg-[#54B1CE]/40", "shadow-lg");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyHeader);
    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="bg-[#54B1CE]/30 backdrop-blur-md border-b border-white/20 transition-all duration-300 fixed w-full z-50"
    >
      <nav className="container mx-auto px-4 md:px-10">
        <div className="py-2 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-14 w-full">
          {/* Left: Logo + Search */}
          <div className="flex items-center w-full max-w-[650px] gap-4">
            <Link to="/" className="group relative">
              <img
                src="/logo-10.png"
                alt="logo"
                className="w-[60px] h-[60px] object-cover rounded-full border-[1px] border-black/30"
              />
            </Link>
            <div className="flex-1">
              <SearchBar />
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex items-center justify-between gap-4 md:gap-8 w-full md:w-auto mt-4 md:mt-0">
            {/* Home */}
            <NavLink
              to="/"
              className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-black/10 transition-colors"
            >
              <BiHomeSmile className="text-[22px] text-[#54B1CE]" />
              <span className="hidden md:block text-gray-900 text-[16px]">Home</span>
            </NavLink>

            {/* Account Dropdown */}
            <div
              className="flex items-center relative cursor-pointer rounded-lg px-3 py-2 hover:bg-black/10 transition-colors"
              onMouseEnter={toggleDropdown}
              onMouseLeave={closeDropdown}
            >
              {auth.user ? (
                <div className="flex items-center gap-1">
                  <AiOutlineUser className="text-[22px] text-[#54B1CE]" />
                  <span className="hidden md:block text-gray-900 text-[16px]">
                    {auth.user.name.split(" ")[0]}
                  </span>
                  <RiArrowDropDownLine className="text-[#54B1CE] group-hover:rotate-180 transition-transform" />
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Link
                    to="/login"
                    className="flex gap-1 items-center text-gray-900 hover:text-gray-700"
                  >
                    <AiOutlineUser className="text-[22px] text-[#54B1CE]" />
                    <span className="hidden md:block text-[16px]">Sign in</span>
                  </Link>
                  <RiArrowDropDownLine className="text-[#54B1CE] group-hover:rotate-180 transition-transform" />
                </div>
              )}

              {isDropdownOpen && (
                <div
                  className="absolute top-[46px] -left-2 z-50 bg-[#54B1CE]/30 backdrop-blur-md border border-white/20 rounded-xl p-2 w-[170px] shadow-xl flex flex-col transition-all"
                  onMouseEnter={toggleDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <ul>
                    {!auth.user && (
                      <li className="p-2 hover:bg-black/10 rounded-lg transition-colors">
                        <Link
                          to="/register"
                          className="flex items-center gap-3 text-gray-900 hover:text-gray-700"
                        >
                          <MdLogin className="text-[18px] text-[#54B1CE]" />
                          <span className="text-[15px]">Sign up</span>
                        </Link>
                      </li>
                    )}
                    <li className="p-2 hover:bg-black/10 rounded-lg transition-colors">
                      <Link
                        to={`${
                          auth?.user?.role === 1
                            ? "/admin"
                            : auth?.user?.role === 0
                            ? "/user"
                            : "/delivery-agent"
                        }/dashboard`}
                        className="flex items-center gap-3 text-gray-900 hover:text-gray-700"
                      >
                        <AiOutlineUser className="text-[18px] text-[#54B1CE]" />
                        <span className="text-[15px]">My Profile</span>
                      </Link>
                    </li>
                    {auth.user?.role !== 1 && (
                      <li className="p-2 hover:bg-black/10 rounded-lg transition-colors">
                        <Link
                          to="/user/wishlist"
                          className="flex items-center gap-3 text-gray-900 hover:text-gray-700"
                        >
                          <AiOutlineHeart className="text-[18px] text-pink-400" />
                          <span className="text-[15px]">Wishlist</span>
                        </Link>
                      </li>
                    )}
                    <li className="p-2 hover:bg-black/10 rounded-lg transition-colors">
                      <Link
                        to={`${
                          auth?.user?.role === 1 ? "/admin" : "/user"
                        }/orders`}
                        className="flex items-center gap-3 text-gray-900 hover:text-gray-700"
                      >
                        <BsBox className="text-[18px] text-yellow-400" />
                        <span className="text-[15px]">Orders</span>
                      </Link>
                    </li>
                    {auth.user && (
                      <li className="p-2 hover:bg-black/10 rounded-lg transition-colors">
                        <Link
                          onClick={handleLogout}
                          to="/login"
                          className="flex items-center gap-3 text-gray-900 hover:text-gray-700"
                        >
                          <MdLogout className="text-[18px] text-red-400" />
                          <span className="text-[15px]">Logout</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Cart */}
            {auth?.user?.role !== 1 && (
              <NavLink
                to="/cart"
                className="relative flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-black/10 transition-colors"
              >
                <span className="absolute w-5 h-5 text-[11px] font-semibold left-4 -top-2 text-white bg-red-500 rounded-full flex items-center justify-center shadow">
                  {cartItems?.length}
                </span>
                <BsCart2 className="text-[22px] text-[#54B1CE]" />
                <span className="hidden md:block text-gray-900 text-[16px]">Cart</span>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

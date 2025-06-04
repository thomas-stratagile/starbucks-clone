import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import accountLogo from "../assets/account_thin.svg";
import searchIcon from "../assets/search.svg";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useCart } from '../context/CartContext'; // Assuming CartContext.js is in src/context

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const { getCartItemCount } = useCart();

  return (
    <header className="max-w-[1296px] mx-auto">
      <div className="w-full px-4 h-[72px] flex justify-between items-center ">
        <div className="z-50"> {/* Ensure close button is above this if it overlaps */}
          <Link to="/">
            <img src={logo} alt="logo" className="w-[40px] h-[40px]" />
          </Link>
        </div>

        <div className="hidden md:flex gap-5">
          <NavLink className="no-underline text-black font-normal" to="/">
            Home
          </NavLink>
          <NavLink className="no-underline  text-black font-normal" to="/gift">
            Gift
          </NavLink>
          <NavLink className="no-underline  text-black font-normal" to="/order">
            Order
          </NavLink>
          <NavLink className="no-underline  text-black font-normal" to="/pay">
            Pay
          </NavLink>
          <NavLink className="no-underline  text-black font-normal" to="/store">
            Store
          </NavLink>
        </div>

        <div className="hidden lg:flex items-center w-[274px] h-[36px] border shadow-sm rounded-full px-[12px] py-[6px]">
          <img className="w-6 mr-2" src={searchIcon} alt="search" />
          <input
            className="w-full outline-none border-none text-sm" // Added text-sm for consistency
            type="text"
            placeholder="Looking for something specific?" // Corrected typo
          />
        </div>

        <div className="hidden md:flex items-center"> {/* Added items-center */}
          <NavLink to="/cart" className="relative flex items-center text-black font-normal mr-9">
            {/* Replace with actual SVG icon if available */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {getCartItemCount() > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </NavLink>
          <img src={accountLogo} alt="account logo" className="w-6 h-6 cursor-pointer" /> {/* Added cursor-pointer and size */}
        </div>

        <div onClick={handleClick} className="md:hidden z-20"> {/* Ensure this is above mobile menu background, z-20 should be fine if mobile menu is z-10 */}
          {!nav ? (
            <HiBars3CenterLeft size={40} />
          ) : (
            <AiOutlineClose size={40} className="text-white" /> // This text-white is for the icon color
          )}
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={
          !nav
            ? "hidden"
            : "md:hidden absolute z-10 top-0 left-0 w-full h-screen bg-[#1E3932] flex flex-col justify-start items-center pt-24 px-4"
        }
      >
        {/* Search Bar for Mobile Menu */}
        <div className="flex w-full max-w-md h-[36px] border shadow-sm rounded-full px-[12px] py-[6px] bg-white mb-6">
          <img className="w-6 mr-2" src={searchIcon} alt="search" />
          <input
            className="w-full outline-none border-none text-sm"
            type="text"
            placeholder="Looking for something specific?"
          />
        </div>

        <NavLink
          className="py-4 text-3xl no-underline text-white"
          onClick={handleClick}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className="py-4 text-3xl no-underline text-white"
          onClick={handleClick}
          to="/gift"
        >
          Gift
        </NavLink>
        <NavLink
          className="py-4 text-3xl no-underline text-white"
          onClick={handleClick}
          to="/order"
        >
          Order
        </NavLink>
        <NavLink
          className="py-4 text-3xl no-underline text-white"
          onClick={handleClick}
          to="/pay"
        >
          Pay
        </NavLink>
        <NavLink
          className="py-4 text-3xl no-underline text-white"
          onClick={handleClick}
          to="/store"
        >
          Store
        </NavLink>

        <NavLink
          className="py-4 text-3xl no-underline text-white relative flex items-center justify-center"
          onClick={handleClick}
          to="/cart"
        >
          Cart
          {getCartItemCount() > 0 && (
            <span className="absolute top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getCartItemCount()}
            </span>
          )}
        </NavLink>

        {/* Account Icon for Mobile Menu */}
        <div className="flex mt-6 cursor-pointer">
          <img src={accountLogo} alt="account logo" className="w-8 h-8" /> {/* Assuming you want a slightly larger icon for touch */}
        </div>
      </div>
    </header>
  );
};
export default Navbar;

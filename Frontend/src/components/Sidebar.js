import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  chartFillImage,
  controlImage,
  bikesImage,
  assemble,
  Logout,
} from "../assets";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      try {
        const user = JSON.parse(atob(token.split('.')[1])); 
        setIsAdmin(user.role === 'admin'); 
        // console.log("USER", user); 
      } catch (error) {
        console.error("Failed to decode token:", error);
        navigate("/login");
      }
    }
  }, [navigate]);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const Menus = [
    ...(isAdmin ? [{ title: "Dashboard", src: chartFillImage, path: "/dashboard" }] : []),
    ...(isAdmin ? [] : [{ title: "Assemble", src: assemble, path: "/assemble" }]),
    { title: "Logout", src: Logout, action: handleLogout },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      className={` ${
        open ? "w-65" : "w-20 "
      } bg-[#0B2C73] h-screen p-5 pt-8 relative duration-300`}
    >
      <img
        src={controlImage}
        alt="icon_img"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
         border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src={bikesImage}
          alt="logo"
          className={`h-10 w-10 rounded-full cursor-pointer duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Dawn Bikes
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <Link
            key={index}
            to={Menu.path}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-black text-white text-sm items-center gap-x-4 
            ${Menu.gap ? "mt-9" : "mt-2"} ${
              isActive(Menu.path) && "bg-[#1F3C7E]"
            }`}
            onClick={Menu.title === "Logout" ? Menu.action : undefined}
          >
            <li className="flex">
              <img src={Menu.src} alt="im_icon" className="w-5 h-5 mr-2" />
              <span
                className={`${!open && "hidden"} origin-left duration-200`}
              >
                {Menu.title}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

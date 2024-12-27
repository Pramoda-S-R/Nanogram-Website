import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SIDEBAR_ITEMS } from "../../constants";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="sidebar">
      <div className="flex flex-col gap-11 bg-neutral-white border-neutral-black border-2 p-2">
        <ul className="flex flex-col gap-6">
          {SIDEBAR_ITEMS.map(({ to, icon: Icon, label }) => {
            const isActive = pathname === to;

            return (
              <li
                key={label}
                className={`sidebar-link group ${isActive && "bg-neutral-black"}`}
              >
                <NavLink
                  to={to}
                  className={`flex gap-4 items-center p-4 text-neutral-black group-hover:font-bold ${
                    isActive && "invert font-bold"
                  }`}
                >
                  <Icon />
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

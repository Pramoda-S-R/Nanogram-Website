import React, { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { LogOut, UserPlus } from "lucide-react";
import { useSignOutAccount } from "../../lib/react_query/queriesAndMutations";
import { useUserContext, INITIAL_USER } from "../../context/AuthContext";
import { Hamburger } from "../ui/Hamburger";
import PulseLoader from "./PulseLoader";
import { NAV_ITEMS } from "../../constants";
import { communityPaths } from "../../constants";

const Navbar = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 400px)" });

  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const handleSignOut = async () => {
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
  };

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isLoggedIn = localStorage.getItem("isAuthenticated");

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="navbar relative">
      <div className=" bg-primary w-full md:py-4 md:px-5 p-0 gap-5 flex">
        <div className=" w-full justify-start items-center flex gap-2">
          <Hamburger onClick={() => setIsActive((prev) => !prev)}></Hamburger>
          <Link to="/" className="flex md:gap-3 gap-1 items-center">
            <img
              src="/assets/images/nano.svg"
              alt="Logo"
              className=" md:size-16 size-8"
            />
            <h1 className=" md:text-3xl text-2xl font-bold text-neutral-white ">
              NANOGRAM
            </h1>
          </Link>
        </div>
        <div className="w-full justify-center items-center lg:flex hidden">
          <SlideTabs />
        </div>
        <div className="hd:w-full w-[40rem] justify-end flex items-center overflow-hidden pr-2">
          {isLoading ? (
            <PulseLoader />
          ) : isLoggedIn && user.imageUrl ? (
            <div className="flex md:gap-3">
              <Button variant="ghost" onClick={() => handleSignOut()}>
                <LogOut className="text-neutral-white" />
              </Button>
              <Link
                to={`/profile/${user.id}`}
                className="flex gap-3 items-center"
              >
                <div className="bg-neutral-white rounded-full md:p-1 p-0.5">
                  <img
                    src={user.imageUrl || "/assets/icons/user.svg"}
                    alt="Avatar"
                    className="md:size-[56px] size-7 rounded-full"
                  />
                </div>
              </Link>
            </div>
          ) : (
            <Button variant="outline" onClick={() => navigate("/sign-in")}>
              {isSmallScreen ? <UserPlus size={20} /> : "Sign in"}
            </Button>
          )}
        </div>
      </div>
      {isActive && (
        <nav
          className={
            "p-3 text-xl text-neutral-black bg-primary gap-3 flex justify-center"
          }
        >
          <div className="rounded-3xl border-neutral-black border-2 w-fit bg-neutral-white p-2">
            {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
              const isCommunity = communityPaths.some((path) =>
                pathname.startsWith(path)
              );

              const isHere =
                label === "Community" ? isCommunity : pathname === to;
              return (
                <Link key={to} to={to}>
                  <div
                    className={`flex gap-3 p-3 items-center  ${
                      isHere &&
                      "bg-neutral-black text-neutral-white rounded-2xl"
                    }`}
                  >
                    <Icon />
                    {label}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </section>
  );
};

export default Navbar;

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <nav>
      <ul
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
        }}
        className="relative mx-auto flex w-[28rem] h-[3rem] md:h-[3.75rem] rounded-full border-2 border-neutral-black bg-neutral-white p-1 shadow-md"
      >
        {NAV_ITEMS.map(({ to, label }) => (
          <Tab setPosition={setPosition} key={to}>
            <Link to={to} key={to}>
              {label}
            </Link>
          </Tab>
        ))}

        <Cursor position={position} />
      </ul>
    </nav>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-2 text-sm font-semibold mix-blend-difference text-neutral-white md:px-4 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-10 rounded-full bg-neutral-black border-neutral-black md:h-12"
    />
  );
};

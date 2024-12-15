import React, { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { LogOut, UserPlus } from "lucide-react";
import { useSignOutAccount } from "../../lib/react_query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";
import { Hamburger } from "../ui/Hamburger";

const Navbar = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 400px)" });

  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const navigate = useNavigate();
  const { user } = useUserContext();

  const isLoggedIn = localStorage.getItem("isAuthenticated");

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="navbar relative">
      <div className=" bg-primary w-full md:py-4 md:px-5 p-0 gap-5 flex">
        <div className=" w-full justify-start items-center flex gap-2">
          <div className="lg:hidden ">
            <Hamburger onClick={() => setIsActive((prev) => !prev)}></Hamburger>
          </div>
          <Link to="/" className="flex md:gap-3 gap-1 items-center">
            <img
              src="/assets/images/nano.svg"
              alt="Logo"
              className=" md:size-16 size-8"
            />
            <h1 className=" md:text-3xl text-2xl font-bold text-neutral-white">
              NANOGRAM
            </h1>
          </Link>
        </div>
        <div className="w-full justify-center items-center lg:flex hidden">
          <SlideTabs />
        </div>
        <div className="hd:w-full w-[40rem] justify-end flex items-center overflow-hidden pr-2">
          {isLoggedIn ? (
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => signOut()}>
                <LogOut className="text-neutral-white" />
              </Button>
              <div className="bg-neutral-white rounded-full p-1">
                <Link
                  to={`/profile/${user.id}`}
                  className="flex gap-3 items-center"
                >
                  <img
                    src={user.imageUrl || "/assets/icons/user.svg"}
                    alt="Avatar"
                    className="md:size-[56px] size-7 rounded-full"
                  />
                </Link>
              </div>
            </div>
          ) : (
            <div className="">
              <Button variant="outline" onClick={() => navigate("/sign-up")}>
                {isSmallScreen ? <UserPlus size={20} /> : "Sign up"}
              </Button>
            </div>
          )}
        </div>
      </div>
      {isActive && (
        <div className="flex flex-col space-y-5 text-center gap-3 py-5 text-xl text-nuetral-white bg-primary text-neutral-white">
          <Link to="/" className="hover:text-secondary hover:underline">Home</Link>
          <Link to="/about-us" className="hover:text-secondary hover:underline">About Us</Link>
          <Link to="/events" className="hover:text-secondary hover:underline">Events</Link>
          <Link to="/community" className="hover:text-secondary hover:underline">Community</Link>
          <Link to="/blog" className="hover:text-secondary hover:underline">Blog</Link>
        </div>
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
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-[31rem] h-[3rem] md:h-[3.75rem] rounded-full border-2 border-neutral-black bg-neutral-white p-1 shadow-md"
    >
      <Tab setPosition={setPosition}><Link to="/">Home</Link></Tab>
      <Tab setPosition={setPosition}><Link to="/about-us">About Us</Link></Tab>
      <Tab setPosition={setPosition}><Link to="/events">Events</Link></Tab>
      <Tab setPosition={setPosition}><Link to="/community">Community</Link></Tab>
      <Tab setPosition={setPosition}><Link to="/blog">Blog</Link></Tab>

      <Cursor position={position} />
    </ul>
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
      className="relative z-10 block cursor-pointer px-3 py-2 text-sm font-semibold mix-blend-difference text-neutral-white md:px-5 md:py-3 md:text-base"
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

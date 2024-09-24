import React from "react";
import { Linkedin, Facebook, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <section className="bg-slate-50 dark:bg-slate-800 px-6 py-20 md:px-8 border-none outline-none">
      <div>
        <div className="mx-auto max-w-7xl flex flex-col gap-20">
          <div className="flex flex-col items-center gap-8 md:justify-between md:flex-row">
            <ul className="flex items-center gap-8">
              <li href="">
                <button className="font-semibold text-slate-900 dark:text-slate-50  hover:text-sky-400  dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500">
                  Home
                </button>
              </li>
              <li href="">
                <button className="font-semibold text-slate-900 dark:text-slate-50  hover:text-sky-400  dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500">
                  About Us
                </button>
              </li>
              <li href="">
                <button className="font-semibold text-slate-900 dark:text-slate-50  hover:text-sky-400  dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500">
                  Events
                </button>
              </li>
              <li href="">
                <button className="font-semibold text-slate-900 dark:text-slate-50  hover:text-sky-400  dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500">
                  Contact
                </button>
              </li>
            </ul>
            <ul className="flex items-center gap-8">
              <li href="">
                <button className="font-semibold text-slate-900 dark:text-slate-50  hover:text-sky-400  dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500">
                  <Linkedin />
                </button>
              </li>
              <li href="">
                <button className="font-semibold text-slate-900 dark:text-slate-50  hover:text-sky-400  dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500">
                  <Instagram />
                </button>
              </li>
              <li href="">
                <button className="font-semibold text-slate-900 dark:text-slate-50  hover:text-sky-400  dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500">
                  <Facebook />
                </button>
              </li>
              <li href="">
                <button className="font-semibold text-slate-900 dark:text-slate-50  hover:text-sky-400  dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500">
                  <Github />
                </button>
              </li>
            </ul>
          </div>
          <p className="w-full text-sm text-center text-slate-600 lg:mt-0 dark:text-slate-400">
            © Nanogram - The Tech Hub 2023, All Rights Reserved
            <br />
            Made with ❤️ by Pramoda S R - Viceroy, Nanogram
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;

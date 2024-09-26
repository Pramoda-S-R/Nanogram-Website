import React from "react";
import { Linkedin, Mail, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for internal routing

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="font-semibold text-slate-900 dark:text-slate-50 hover:text-sky-400 dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500"
    >
      {children}
    </Link>
  </li>
);

const SocialMediaLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-slate-900 dark:text-slate-50 hover:text-sky-400 dark:hover:text-sky-400 focus:text-sky-500 dark:focus:text-sky-500"
    >
      {children}
    </a>
  </li>
);

const Footer = () => {
  return (
    <section className="bg-slate-50 dark:bg-slate-800 px-6 py-20 md:px-8 border-none outline-none">
      <div>
        <div className="mx-auto max-w-7xl flex flex-col gap-12">
          <div className="flex flex-col items-center gap-8 md:justify-between md:flex-row">
            <ul className="flex items-center gap-8">
              <FooterLink to="/#top">Home</FooterLink>
              <FooterLink to="/about-us#top">About Us</FooterLink>
              <FooterLink to="/events#top">Events</FooterLink>
              <FooterLink to="/events#faq">FAQ</FooterLink>
            </ul>
            <ul className="flex items-center gap-8">
              <SocialMediaLink href="https://www.linkedin.com/company/nanogramhub/">
                <Linkedin />
              </SocialMediaLink>
              <SocialMediaLink href="https://www.instagram.com/nanogram_drait">
                <Instagram />
              </SocialMediaLink>
              <SocialMediaLink href="mailto:nanogramhub@gmail.com">
                <Mail />
              </SocialMediaLink>
              <SocialMediaLink href="https://github.com">
                <Github />
              </SocialMediaLink>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-8 md:justify-between md:flex-row">
            <p className="w-auto text-sm lg:text-left text-slate-600 lg:mt-0 dark:text-slate-400 sm:text-justify">
              Dept. of Electronics and Communication Engineering
              <br />
              Dr. Ambedkar Institute of Technology, Bengaluru
            </p>
            <p className="w-auto text-sm lg:text-right text-slate-600 lg:mt-0 dark:text-slate-400 sm:text-justify">
              © Nanogram - The Tech Hub 2023, All Rights Reserved
              <br />
              Made with ❤️ by Pramoda S R - Viceroy, Nanogram
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;

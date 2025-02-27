import React from "react";
import { Linkedin, Mail, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for internal routing

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="font-semibold text-neutral-black">
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
      className="font-semibold text-neutral-black"
    >
      {children}
    </a>
  </li>
);

const Footer = () => {
  return (
    <section className=" px-6 py-10 md:px-8">
      <div>
        <div className="mx-auto max-w-7xl flex flex-col gap-12">
          <div className="flex flex-col items-center gap-8 md:justify-between md:flex-row">
            <ul className="flex items-center gap-8">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about-us">About Us</FooterLink>
              <FooterLink to="/events">Events</FooterLink>
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
              <SocialMediaLink href="https://github.com/nanogramhub">
                <Github />
              </SocialMediaLink>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-8 md:justify-between md:flex-row">
            <p className="w-auto text-sm lg:text-left text-neutral-black/70 sm:text-justify">
              Dept. of Electronics and Communication Engineering
              <br />
              Dr. Ambedkar Institute of Technology, Bengaluru
            </p>
            <p className="w-auto text-sm lg:text-right text-neutral-black/70 sm:text-justify">
              © Nanogram - The Tech Hub 2024, All Rights Reserved
              <br />
              Made with ❤️ by Pramoda S R - Viceroy, Nanogram
              <br />
              Security tested by Fardeen S Khadri - Legacy Sentinal, Nanogram
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;

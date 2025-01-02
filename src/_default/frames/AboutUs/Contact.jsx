import React from "react";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <div className="relative w-full" id="contact">
      <div className="max-w-7xl mx-auto py-28 px-4 ">
        <div className="absolute inset-0 w-full h-200">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1278150071275!2d77.50345041027362!3d12.963672087298189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3e9c40000001%3A0x2d368cebf691c5fb!2sDr.%20Ambedkar%20Institute%20Of%20Technology!5e0!3m2!1sen!2sin!4v1727277912673!5m2!1sen!2sin"
            loading="lazy"
            title="Map of Tech Hub HQ"
          ></iframe>
        </div>
        <div className="w-fit md:w-1/2 gap-8 shadow backdrop-blur rounded-2xl py-10 px-10">
          <h1 className="text-3xl font-semibold text-neutral-black">
            Contact Us
          </h1>
          <p className="text-base font-normal text-neutral-black/70">
            Visit us at our headquarters and explore the vibrant environment
            where innovation happens.
          </p>

          <Link
            to="https://maps.app.goo.gl/EfTzvMRGeyo8tt717"
            className="flex items-center text-primary/70 "
          >
            <MapPin className="mr-2" />
            Nanogram HQ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

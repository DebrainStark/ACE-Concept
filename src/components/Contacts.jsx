import React from "react";
import { Phone, Mail } from "react-feather";

const Contact = () => {
  return (
    <div className="relative bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-blue-900/10 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white">
              Ready to Create{" "}
              <span className="text-blue-500">Something Amazing?</span>
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Let's discuss your next event and bring your vision to life.
            </p>
          </div>
          <div className="space-y-6 md:text-right">
            <a
              href="tel:+1234567890"
              className="block md:inline-flex items-center text-white hover:text-blue-300 transition-colors duration-300"
            >
              <Phone className="mr-2" size={20} />
              (123) 456-7890
            </a>
            <br />
            <a
              href="mailto:contact@aceconcept.com"
              className="block md:inline-flex items-center text-white hover:text-blue-300 transition-colors duration-300"
            >
              <Mail className="mr-2" size={20} />
              contact@aceconcept.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

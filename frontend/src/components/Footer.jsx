import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-lime-700 text-white py-8 px-6 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Logo/Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Sheria 360</h2>
          <p className="text-sm leading-relaxed">
            Connecting citizens and businesses with legal aid, providing easy access to justice and tracking legal cases.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2"><a href="/about" className="hover:underline">About Us</a></li>
            <li className="mb-2"><a href="/services" className="hover:underline">Services</a></li>
            <li className="mb-2"><a href="/contact" className="hover:underline">Contact</a></li>
            <li className="mb-2"><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">
            Email: <a href="mailto:info@sheria360.com" className="underline hover:text-lime-400">raddamestonui95.com</a><br />
            Phone: <a href="tel:+254700123456" className="underline hover:text-lime-400">+254 717 77 14 61</a>
          </p>

          {/* Social Media Icons */}
          <div className="mt-4 flex space-x-4">
            <a href="#" className="hover:text-lime-400">
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a href="#" className="hover:text-lime-400">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" className="hover:text-lime-400">
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-lime-600 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Sheria 360. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  interface SocialLink {
    icon: React.ComponentType<{ className?: string }>;
    url: string;
  }

  const socialLinks: SocialLink[] = [
    {
      icon: Instagram,
      url: "https://www.instagram.com/sanskrithigroup_ptp/?hl=en",
    },
    {
      icon: Facebook,
      url: "https://www.facebook.com/sseptp/",
    },
    {
      icon: Twitter,
      url: "https://x.com/SanskrithiGroup",
    },
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/in/sgiputtaparthi/",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-white to-[#f9843d] text-[#1f1f1f] mt-20 rounded-t-3xl shadow-lg overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Sanskrithi School of Engineering
          </h2>
          <p className="text-lg text-gray-800 max-w-3xl mx-auto">
            Empowering future engineers with knowledge, skills, and values since 2010.
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-8 shadow-md text-gray-900">
          <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
            Contact Information
          </h2>
          <div className="grid gap-8 md:grid-cols-3 text-base">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <MapPin className="w-6 h-6 mb-2 text-[#f9843d]" />
              <span>
                Beedupalli Knowledgepark, Behind SSSIHMS, Puttaparthi,
                <br />
                Sri Sathya Sai District, AP - 515134
              </span>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <Phone className="w-6 h-6 mb-2 text-green-600" />
              <span>+91 9100064545 / 74545</span>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <Mail className="w-6 h-6 mb-2 text-yellow-600" />
              <span>enquiry@sseptp.org</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Connect With Us
          </h3>
          <div className="flex justify-center gap-4">
            {socialLinks.map(({ icon: Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#f9843d]/10 hover:bg-[#f9843d]/20 transition rounded-full p-3"
                aria-label={`Social link ${i}`}
              >
                <Icon className="w-6 h-6 text-[#f9843d]" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="border-t border-[#f9843d]/30 pt-6 text-center mt-12">
          <p className="text-gray-800 text-lg mb-2">
            For any queries or information, please contact the respective departments.
          </p>
          <p className="text-sm text-gray-700">
            © {new Date().getFullYear()} Sanskrithi School of Engineering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

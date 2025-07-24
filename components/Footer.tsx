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
    // Define type for social media item
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
      <footer className="bg-[#9a3310] bg-gradient-to-br from-[#872e0e] to-[#9a3310] text-white mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              Sanskrithi School of Engineering
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Empowering future engineers with knowledge, skills, and values since 2010.
            </p>
          </div>
  
          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mt-4 shadow-lg text-white">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Contact Information
            </h2>
            <div className="grid gap-8 md:grid-cols-3 text-sm">
              {/* Address */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <MapPin className="w-6 h-6 mb-2 text-orange-300" />
                <span>
                  Beedupalli Knowledgepark, Behind SSSIHMS, Puttaparthi,<br />
                  Sri Sathya Sai District, AP - 515134
                </span>
              </div>
  
              {/* Phone */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <Phone className="w-6 h-6 mb-2 text-green-300" />
                <span>+91 9100064545 / 74545</span>
              </div>
  
              {/* Email */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <Mail className="w-6 h-6 mb-2 text-yellow-300" />
                <span>enquiry@sseptp.org</span>
              </div>
            </div>
          </div>
  
          {/* Social Media */}
          <div className="text-center my-12">
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map(({ icon: Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 transition duration-300 ease-in-out rounded-full p-3"
                  aria-label={`Social link ${i}`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </a>
              ))}
            </div>
          </div>
  
          {/* Footer Note */}
          <div className="border-t border-white/20 pt-6 text-center">
            <p className="text-white/90 text-lg mb-2">
              For any queries, problems, or future information, please contact
              the respective departments above.
            </p>
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} Sanskrithi School of Engineering. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
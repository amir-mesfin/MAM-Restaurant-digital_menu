import { FaFacebook, FaInstagram, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#A47621] text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">ማም ሬስቶራንት</h2>
          <p className="mt-2 text-sm">Delicious Ethiopian & International Foods</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <Link to='/sign'>Edit</Link>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm">
            <FaPhoneAlt /> +251 962 945 025
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm mt-2">
            <FaMapMarkerAlt /> Arba Minch, Ethiopia
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-3 text-xl">
            <a href="#" className="hover:text-gray-200"><FaFacebook /></a>
            <a href="#" className="hover:text-gray-200"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs mt-8 border-t border-white/30 pt-4">
        © {new Date().getFullYear()} ማም ሬስቶራንት | Digital Menu. All rights reserved.
      </div>
    </footer>
  );
}

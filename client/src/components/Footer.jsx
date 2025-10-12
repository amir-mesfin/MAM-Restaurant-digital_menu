import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUniversity, FaMoneyBillAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa6";

export default function Footer() {
  const navigate = useNavigate(); // initialize useNavigate

  return (
    <footer className="bg-[#A47621] text-white pt-12 relative">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Location */}
        <div>
          <h3 className="text-lg font-semibold mb-3">📍 አድራሻ</h3>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <FaMapMarkerAlt className="text-[#E3A700]" />
            አርባ ምንጭ ዩኒቨርሲቲ
          </p>
          <p className="text-sm mt-1">ዋና ካምፕስ</p>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-3">🕒 ሰዓት</h3>
          <p>ከእሁድ እስከ እሁድ</p>
          <p>ከጧት 12፡00 እስከ ምሽት 4፡00</p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">📞 አግኙን</h3>
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm">
            <FaPhoneAlt className="text-[#E3A700]" /> 0962 94 50 25
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm mt-2">
            <FaPhoneAlt className="text-[#E3A700]" /> 0976211773
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm mt-2">
            <FaEnvelope className="text-[#E3A700]" /> amir.mesfin136@amu.edu.et
          </p>
        </div>

        {/* Map */}
        <div>
          <h3 className="text-lg font-semibold mb-3">🗺️ ካርታ</h3>
          <iframe
            title="Arba Minch University Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.469917299909!2d37.55361021477704!3d6.040913495642934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b4a6a78d12345%3A0xabcdef!2sArba%20Minch%20University!5e0!3m2!1sen!2set!4v1633087267032!5m2!1sen!2set"
            width="100%"
            height="150"
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg border-2 border-[#E3A700] shadow-lg"
          ></iframe>
        </div>
      </div>

      {/* Payment Accounts Section */}
      <div className="max-w-6xl mx-auto px-6 mt-8" id="Payment">
        <div className="bg-[#8B621C] rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-center flex items-center justify-center gap-2">
            <FaMoneyBillAlt className="text-[#E3A700]" />
            የክፍያ መለያዎች
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#A47621] rounded-lg p-4 text-center hover:bg-[#8B621C] transition-colors duration-300">
              <FaUniversity className="text-[#E3A700] mx-auto text-xl mb-2" />
              <h4 className="font-semibold">CBE</h4>
              <p className="text-sm mt-1">1000420875227</p>
              <p className="text-xs text-gray-200 mt-1">ማም ሬስቶራንት</p>
            </div>

            <div className="bg-[#A47621] rounded-lg p-4 text-center hover:bg-[#8B621C] transition-colors duration-300">
              <FaUniversity className="text-[#E3A700] mx-auto text-xl mb-2" />
              <h4 className="font-semibold">BOA</h4>
              <p className="text-sm mt-1">1347673</p>
              <p className="text-xs text-gray-200 mt-1">ማም ሬስቶራንት</p>
            </div>

            <div className="bg-[#A47621] rounded-lg p-4 text-center hover:bg-[#8B621C] transition-colors duration-300">
              <FaMoneyBillAlt className="text-[#E3A700] mx-auto text-xl mb-2" />
              <h4 className="font-semibold">Telebirr</h4>
              <p className="text-sm mt-1">0962945525</p>
              <p className="text-xs text-gray-200 mt-1">አሚር መስፍን</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#8B621C] mt-8 py-6 px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold">የተሰራው በ አሚር መስፍን</p>
          <p className="text-xs mt-1">
            © {new Date().getFullYear()} አርባ ምንጭ ዩኒቨርሲቲ | መብቱ በህግ የተጠበቀ ነው።
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mt-4 md:mt-0 text-xl">
          <a href="#" className="hover:text-[#E3A700] transition-colors duration-300">
            <FaTiktok />
          </a>
          <a href="#" className="hover:text-[#E3A700] transition-colors duration-300">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-[#E3A700] transition-colors duration-300">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-[#E3A700] transition-colors duration-300">
            <FaTwitter />
          </a>
        </div>

        {/* Call Button */}
        <div className="mt-4 md:mt-0">
          <button className="bg-[#E3A700] text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 flex items-center gap-2 font-semibold">
            <FaPhoneAlt /> 09 62 94 50 25
          </button>
        </div>
      </div>

      {/* Edit Navigation Buttons using useNavigate */}
      <div className="pb-2 pr-4 text-end text-sm border-t border-white/20 flex justify-end gap-5">
        <button
          onClick={() => navigate("/")}
          className="underline hover:text-[#E3A700] transition-colors duration-300"
        >
          home
        </button>
        <button
          onClick={() => navigate("/sign")}
          className="underline hover:text-[#E3A700] transition-colors duration-300"
        >
          ✏️go edit
        </button>
      </div>

      <div className="md:mt-0 fixed bottom-1 left-2">
        <button className="bg-[#E3A700] text-white px-3 py-2 rounded-lg shadow-lg hover:bg-yellow-600 transition-all duration-300 flex items-center gap-2 font-semibold">
          CBE 100023455
        </button>
      </div>
      <div className="md:mt-0 fixed bottom-6 right-2">
        <a 
         href="#" className="bg-[#E3A700] text-white px-3 py-2 rounded-lg shadow-lg hover:bg-yellow-600 transition-all duration-300 flex items-center gap-2 font-semibold">
        <FaArrowUp className="text-xl"/>
        </a>
        </div>
    </footer>
  );
}
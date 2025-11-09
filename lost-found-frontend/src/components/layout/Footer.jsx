import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Lost & Found</h3>
            <p className="text-sm">
              A campus-wide platform to help students reunite with their lost belongings.
              Report lost items, browse found items, and claim what's yours.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/feed" className="hover:text-white transition-colors">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-white transition-colors">
                  Report Item
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@lostandfound.edu</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 XXXX XXXXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Campus Admin Office</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Lost & Found. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

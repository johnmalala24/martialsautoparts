import Link from 'next/link';
import { Phone, MessageCircle, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white mt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo width={140} height={70} className="h-16 w-auto object-contain filter brightness-0 invert" />
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              For a ride in perfect flow
            </p>
            <p className="text-gray-500 text-sm">
              Premium auto parts for all your vehicle needs. Quality guaranteed.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-red-500 transition-all duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Shop</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-red-500 transition-all duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-red-500 transition-all duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Categories</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">Engine Parts</li>
              <li className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">Brake System</li>
              <li className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">Suspension</li>
              <li className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">Electrical</li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Contact Us</h4>
            <div className="space-y-4">
              <a 
                href="tel:+254798880398" 
                className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-all duration-200 group"
              >
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-red-600 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+254 798 880 398</span>
              </a>
              <a 
                href="https://wa.me/254798880398" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-all duration-200 group"
              >
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-green-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span>WhatsApp</span>
              </a>
              <a 
                href="mailto:info@martialsautoparts.com" 
                className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-all duration-200 group"
              >
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-red-600 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@martialsautoparts.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <div className="p-2 bg-gray-800 rounded-lg mt-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-sm">
                  <p>Nairobi, Kenya</p>
                  <a href="https://www.martialsautoparts.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">
                    www.martialsautoparts.com
                  </a>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="mt-4 pt-4 border-t border-gray-800/50">
                <p className="text-sm text-gray-500 mb-3">Follow Us</p>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com/martialsautoparts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 text-gray-400 hover:text-white" />
                  </a>
                  <a
                    href="https://instagram.com/martialsautoparts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-pink-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 text-gray-400 hover:text-white" />
                  </a>
                  <a
                    href="https://x.com/martialsauto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    aria-label="X (Twitter)"
                  >
                    <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href="https://tiktok.com/@martialsautoparts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-black transition-colors"
                    aria-label="TikTok"
                  >
                    <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; 2024 Martial&apos;s Auto Parts. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/about" className="hover:text-red-500 transition-colors">Privacy Policy</Link>
              <Link href="/contact" className="hover:text-red-500 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
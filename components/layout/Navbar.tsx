'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from './Logo';
import { useAuth } from '@/lib/hooks/useAuth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg text-gray-900' 
        : 'bg-black/95 backdrop-blur-md text-white'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 font-medium relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/shop" 
              className="px-4 py-2 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 font-medium relative group"
            >
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 font-medium relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 font-medium relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          
          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="p-2 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 relative group">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                0
              </span>
            </button>
            {user ? (
              <>
                <Link 
                  href={`/dashboard/${user.role}`} 
                  className="px-4 py-2 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 font-medium flex items-center gap-2"
                  title="Dashboard"
                >
                  <User className="w-5 h-5" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 font-medium flex items-center gap-2"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/signin"
                  className="px-4 py-2 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-red-600/10 transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t border-gray-800/50">
            <div className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="px-4 py-3 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/shop" 
                className="px-4 py-3 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/about" 
                className="px-4 py-3 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="px-4 py-3 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="border-t border-gray-800/50 my-2"></div>
              {user ? (
                <>
                  <Link 
                    href={`/dashboard/${user.role}`} 
                    className="px-4 py-3 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard ({user.name})
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/signin"
                    className="px-4 py-3 rounded-lg hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/signup"
                    className="px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
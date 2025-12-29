'use client';

import { Phone, MessageCircle, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 pt-28">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get in touch with us - we&apos;re here to help
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="animate-fade-in-up">
              <Card hover>
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <Input 
                      label="Name"
                      type="text"
                      placeholder="Your name"
                      required
                    />
                    <Input 
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                    <Input 
                      label="Phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        placeholder="How can we help you?"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </div>
              </Card>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <Card hover>
                  <div className="p-6 flex items-start gap-4 group">
                    <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 text-gray-900">Phone</h3>
                      <a href="tel:+254798880398" className="text-gray-700 font-medium hover:text-red-600 transition-colors">
                        +254 798 880 398
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Mon-Fri 9am-6pm EAT</p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <Card hover>
                  <div className="p-6 flex items-start gap-4 group">
                    <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 text-gray-900">WhatsApp</h3>
                      <a href="https://wa.me/254798880398" target="_blank" rel="noopener noreferrer" className="text-gray-700 font-medium hover:text-green-600 transition-colors">
                        +254 798 880 398
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Available 24/7</p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <Card hover>
                  <div className="p-6 flex items-start gap-4 group">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 text-gray-900">Email</h3>
                      <a href="mailto:info@martialsautoparts.com" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
                        info@martialsautoparts.com
                      </a>
                      <p className="text-sm text-gray-500 mt-1">We&apos;ll respond within 24 hours</p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <Card hover>
                  <div className="p-6 flex items-start gap-4 group">
                    <div className="p-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 text-gray-900">Location</h3>
                      <p className="text-gray-700 font-medium">Nairobi, Kenya</p>
                      <a href="https://www.martialsautoparts.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-red-600 transition-colors mt-2 inline-block">
                        www.martialsautoparts.com
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Social Media */}
              <div className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <Card hover>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-4 text-gray-900">Follow Us</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href="https://facebook.com/martialsautoparts"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
                      >
                        <Facebook className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Facebook</span>
                      </a>
                      <a
                        href="https://instagram.com/martialsautoparts"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors group"
                      >
                        <Instagram className="w-5 h-5 text-pink-600" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-pink-600">Instagram</span>
                      </a>
                      <a
                        href="https://x.com/martialsauto"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                      >
                        <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">X (Twitter)</span>
                      </a>
                      <a
                        href="https://tiktok.com/@martialsautoparts"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-black rounded-xl hover:bg-gray-900 transition-colors group"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                        </svg>
                        <span className="text-sm font-medium text-white">TikTok</span>
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
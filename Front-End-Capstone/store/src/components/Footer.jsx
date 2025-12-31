import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const LinkedIn = "https://www.linkedin.com/in/ramon-adedotun-b20479305";

  return (
    <footer className="bg-royal-blue text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12">
          
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="/Logo.png" 
              alt="Logo" 
              className="h-10 md:h-12 w-auto rounded-md"
            />
            <p className="text-royal-gold text-sm italic text-center md:text-left leading-relaxed">
              Bringing the finest selection of food, wine, and lifestyle essentials 
              directly to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="font-serif text-royal-gold text-lg mb-4 underline decoration-royal-gold/30 underline-offset-8">
              The Collection
            </h4>
            <ul className="space-y-2 text-sm text-blue-100 text-center">
              <li><Link to="/home" className="hover:text-royal-gold transition-colors">Home Palace</Link></li>
              <li><Link to="/products" className="hover:text-royal-gold transition-colors">Royal Gallery</Link></li>
              <li><Link to="/cart" className="hover:text-royal-gold transition-colors">Shopping Bag</Link></li>
              <li><Link to="/order" className="hover:text-royal-gold transition-colors">Special Requests</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-serif text-royal-gold text-lg mb-4 underline decoration-royal-gold/30 underline-offset-8">
              Contact the Developer
            </h4>
            <div className="text-sm text-blue-100 space-y-3 text-center md:text-right">
              <p className="flex items-center justify-center md:justify-end gap-2">
                Ramon Adedotun
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
             >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
               <circle cx="12" cy="7" r="4" />
             </svg>
</p>

              <p className="flex items-center justify-center md:justify-end gap-2">
                08109189239
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </p>
              <a 
                href={LinkedIn} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center md:justify-end gap-2 hover:text-royal-gold transition-colors"
              >
                LinkedIn Registry
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <p className="text-xs text-blue-300 pt-2">Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 text-center">
          <p className="text-xs text-blue-200 tracking-widest font-light">
            &copy; {new Date().getFullYear()} PRINCE AND PRINCESS. 
            <span className="block mt-2 opacity-50 uppercase">Architected by Ramon Adedotun</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
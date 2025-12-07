import React from 'react'

function Footer() {
  return (
    <footer className="py-12 md:py-16 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4">Ready to ditch the Range Anxiety?</h2>
        <p className="text-xl text-gray-400 mb-8">Join the EV revolution powered by smart navigation.</p>
        
        {/* Final CTA Button */}
        <a 
          href="#signup" 
          className="inline-flex items-center px-12 py-5 font-bold rounded-full text-white bg-blue-600 hover:bg-blue-700 transition duration-500 shadow-2xl"
        >
          Get Started Free
        </a>
        
        {/* Footer Links */}
        <div className="mt-12 text-sm text-gray-500 space-x-6">
          <a href="#" className="hover:text-blue-400 transition">About</a>
          <a href="#" className="hover:text-blue-400 transition">Tech Stack</a>
          <a href="#" className="hover:text-blue-400 transition">API Documentation</a>
          <a href="#" className="hover:text-blue-400 transition">Support</a>
        </div>
        <p className="mt-8 text-xs text-gray-600">&copy; 2025 SlotMySocket. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer
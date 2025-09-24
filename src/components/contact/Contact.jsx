import React from "react";

const Contact = () => (
  <section className="min-h-screen bg-gradient-to-br from-cream via-gray-200 to-cream-light flex items-center justify-center px-4 py-12">
    <div className="max-w-4xl w-full bg-cream rounded-2xl shadow-2xl border border-gray-200 p-8 md:p-12 flex flex-col md:flex-row gap-10 animate-fade-in">
      {/* Left: Info & Map */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-mono mb-4 tracking-tight animate-fade-in">
            Get in Touch
          </h2>
          <p className="text-gray-700 mb-6 text-lg font-light animate-fade-in">
            We'd love to hear from you! Fill out the form or reach us directly at our office.
          </p>
          <div className="space-y-4 text-gray-800 text-base font-sans">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5"></path>
                  <circle cx="12" cy="10" r="4"></circle>
                </svg>
              </span>
              SSG Pvt Ltd, 123 Main Street, New Delhi, India
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9-4-16-3 7H2"></path>
                </svg>
              </span>
              +91 98765 43210
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 12v1a4 4 0 01-8 0v-1"></path>
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 17v2m0-2a4 4 0 01-4-4v-1a4 4 0 018 0v1a4 4 0 01-4 4z"></path>
                </svg>
              </span>
              info@ssg.com
            </div>
          </div>
        </div>
        {/* Map */}
        <div className="mt-8 rounded-xl overflow-hidden border border-gray-200 shadow-lg animate-fade-in">
          <iframe
            title="SSG Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.77296340136!2d77.2090217!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2b1e4e6e7b1%3A0x5e9b8e7b1e4e6e7b!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1695379200000!5m2!1sen!2sin"
            width="100%"
            height="180"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-44 transition-all duration-700 hover:scale-105"
          ></iframe>
        </div>
      </div>
      {/* Right: Contact Form */}
      <form className="flex-1 bg-cream-light rounded-xl p-8 shadow-lg border border-gray-200 flex flex-col gap-6 animate-fade-in">
        <h3 className="text-2xl font-bold text-gray-900 font-mono mb-2">Contact Form</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="bg-gray-200 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 font-sans"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="bg-gray-200 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 font-sans"
            required
          />
          <input
            type="text"
            placeholder="Subject"
            className="bg-gray-200 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 font-sans"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="bg-gray-200 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 font-sans resize-none"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-gray-400 via-cream to-gray-200 text-gray-900 font-bold py-3 rounded-lg shadow-lg hover:scale-105 hover:shadow-gray-400 transition-all duration-300 font-mono tracking-wide"
        >
          Send Message
        </button>
      </form>
    </div>
    <style>
      {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both;
        }
      `}
    </style>
  </section>
);

export default Contact;
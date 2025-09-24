import React, { useState } from "react";

const faqs = [
  {
    category: "Electronics",
    qas: [
      {
        question: "What is the warranty period for electronics?",
        answer: "All electronics come with a minimum 1-year manufacturer warranty. Some products may offer extended warranties.",
      },
      {
        question: "Can I return a faulty electronic item?",
        answer: "Yes, faulty electronics can be returned within 10 days of delivery for a replacement or refund.",
      },
      {
        question: "Do you offer installation services for electronics?",
        answer: "Yes, installation services are available for select products. Please check the product page for details.",
      },
    ],
  },
  {
    category: "Clothing",
    qas: [
      {
        question: "What is your clothing return policy?",
        answer: "Clothing items can be returned within 15 days of delivery, provided they are unused and have all original tags.",
      },
      {
        question: "How do I find my size?",
        answer: "Each product page includes a size chart. If you need further assistance, contact our support team.",
      },
      {
        question: "Are the clothes machine washable?",
        answer: "Most clothing items are machine washable. Please refer to the care instructions on the product label.",
      },
    ],
  },
  {
    category: "Jewellery",
    qas: [
      {
        question: "Is your jewellery real gold or silver?",
        answer: "We offer both real and gold/silver-plated jewellery. Please check the product description for material details.",
      },
      {
        question: "Can I get my jewellery customized?",
        answer: "Yes, we offer customization on select jewellery items. Contact us for more information.",
      },
      {
        question: "How should I care for my jewellery?",
        answer: "Keep jewellery away from moisture and chemicals. Store in a dry place and clean with a soft cloth.",
      },
    ],
  },
];

const FAQ = () => {
  const [open, setOpen] = useState({});

  const toggle = (catIdx, qIdx) => {
    setOpen((prev) => ({
      ...prev,
      [`${catIdx}-${qIdx}`]: !prev[`${catIdx}-${qIdx}`],
    }));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 py-16 px-4 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-indigo-300 font-mono mb-10 tracking-tight animate-fade-in">
        Frequently Asked Questions
      </h2>
      <div className="w-full max-w-3xl space-y-8">
        {faqs.map((cat, catIdx) => (
          <div key={cat.category} className="mb-6">
            {/* <h3 className="text-2xl font-bold text-indigo-400 mb-4 font-mono animate-fade-in">
              {cat.category}
            </h3> */}
            <div className="space-y-4">
              {cat.qas.map((qa, qIdx) => (
                <div
                  key={qa.question}
                  className="bg-gray-900/80 border border-indigo-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300"
                >
                  <button
                    className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none group"
                    onClick={() => toggle(catIdx, qIdx)}
                  >
                    <span className="text-lg text-gray-200 font-semibold font-sans group-hover:text-indigo-300 transition">
                      {qa.question}
                    </span>
                    <svg
                      className={`w-6 h-6 text-indigo-400 transform transition-transform duration-300 ${
                        open[`${catIdx}-${qIdx}`] ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`px-6 pb-4 text-gray-300 text-base font-sans transition-all duration-500 ${
                      open[`${catIdx}-${qIdx}`]
                        ? "max-h-40 opacity-100 animate-fade-in"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    {qa.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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
};

export default FAQ;
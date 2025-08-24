import { Check } from "lucide-react";

interface PromotionalOffersProps {
  onBookAppointment: () => void;
}

export default function PromotionalOffers({ onBookAppointment }: PromotionalOffersProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Dental Treatment Offer */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start mb-6">
              <div className="bg-goto-green rounded-full p-4 mr-4 flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
                  <path d="M12 2c-1.5 0-3 1-3 3v2c0 1-1 2-2 3s-2 2-2 4v6c0 1 1 2 2 2h2c1 0 2-1 2-2v-6c0-2 1-3 1-4s1-3 1-3v-2c0-2-1.5-3-1-3z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Up to $200 OFF Dental Treatment¹
                </h3>
                <p className="text-gray-600 mb-6">
                  Start this season with a healthy smile! Enjoy tiered savings when you pay out of pocket for dental care services.
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="font-semibold text-gray-800 mb-3">For a limited time:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-goto-blue mr-3" />
                  <span><strong>$50 off</strong> when you spend $150+</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-goto-blue mr-3" />
                  <span><strong>$100 off</strong> when you spend $300+</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-goto-blue mr-3" />
                  <span><strong>$200 off</strong> when you spend $600+</span>
                </li>
              </ul>
            </div>
            
            <button 
              className="w-full bg-goto-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-goto-dark-blue transition-colors duration-200"
              data-testid="button-dental-deal"
              onClick={onBookAppointment}
            >
              Get this Deal
            </button>
          </div>
          
          {/* Orthodontics Offer */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start mb-6">
              <div className="bg-goto-green rounded-full p-4 mr-4 flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
                  <path d="M3 8v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8H3zm2 6v-2h2v2H5zm4 0v-2h2v2H9zm4 0v-2h2v2h-2zm4 0v-2h2v2h-2z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Up to $500 off on Orthodontics²
                </h3>
                <p className="text-gray-600 mb-6">
                  Whether you're starting a new school year or just ready for a fresh start, now's the perfect time to begin your smile journey.
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="font-semibold text-gray-800 mb-3">For a limited time:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-goto-green mr-3" />
                  <span><strong>Save $250</strong> on Invisalign Go</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-goto-green mr-3" />
                  <span><strong>Save $500</strong> on full braces or Invisalign at select locations</span>
                </li>
              </ul>
            </div>
            
            <button 
              className="w-full bg-goto-green text-white py-3 px-6 rounded-lg font-semibold hover:bg-goto-dark-green transition-colors duration-200"
              data-testid="button-ortho-deal"
              onClick={onBookAppointment}
            >
              Get this Deal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

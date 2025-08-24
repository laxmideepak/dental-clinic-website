import { Phone } from "lucide-react";

interface HeaderProps {
  onBookAppointment: () => void;
}

export default function Header({ onBookAppointment }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-jefferson-blue rounded-full flex items-center justify-center mr-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <div className="text-jefferson-dark-blue font-bold text-lg lg:text-xl">
                  JEFFERSON
                </div>
                <div className="text-xs text-gray-600 -mt-1">
                  DENTAL & ORTHODONTICS
                </div>
              </div>
            </div>
          </div>
          
          {/* Phone and CTA */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center text-gray-700">
              <Phone className="w-5 h-5 text-jefferson-blue mr-2" />
              <span className="font-semibold text-lg">972-808-0401</span>
            </div>
            <button 
              className="bg-jefferson-blue text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-semibold hover:bg-jefferson-dark-blue transition-colors duration-200"
              data-testid="button-header-appointment"
              onClick={onBookAppointment}
            >
              BOOK AN APPOINTMENT
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

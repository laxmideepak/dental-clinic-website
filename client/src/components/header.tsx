import { Phone } from "lucide-react";

interface HeaderProps {
  onBookAppointment: () => void;
}

export default function Header({ onBookAppointment }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <img 
                src="/logo.jpg" 
                alt="GoTo Optical - EYEWEAR + EYECARE" 
                className="h-10 sm:h-12 lg:h-16 w-auto"
              />
            </div>
          </div>
          
          {/* Phone and CTA */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-4">
            <button 
              className="bg-goto-blue text-white px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-6 lg:py-3 rounded-lg font-semibold hover:bg-goto-dark-blue transition-colors duration-200 flex items-center text-xs sm:text-sm lg:text-base touch-manipulation"
              data-testid="button-call-us"
            >
              <Phone className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">Call Us</span>
              <span className="sm:hidden">Call</span>
            </button>
            <button 
              className="bg-orange-500 text-white px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-6 lg:py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 text-xs sm:text-sm lg:text-base touch-manipulation"
              data-testid="button-header-appointment"
              onClick={onBookAppointment}
            >
              <span className="hidden sm:inline">Book Online</span>
              <span className="sm:hidden">Book</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

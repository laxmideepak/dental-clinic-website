import { Star } from "lucide-react";

interface HeroSectionProps {
  onBookAppointment: () => void;
}

export default function HeroSection({ onBookAppointment }: HeroSectionProps) {
  return (
    <section className="hero-gradient text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left z-10 relative">
            {/* Tooth and Pencil Illustration */}
            <div className="mb-6 lg:mb-8 flex justify-center lg:justify-start">
              <div className="relative">
                {/* Pencil */}
                <div className="relative mr-3 lg:mr-4">
                  <div className="w-2 h-12 lg:w-3 lg:h-16 bg-yellow-400 rounded-full transform rotate-45"></div>
                  <div className="w-3 h-3 lg:w-4 lg:h-4 bg-pink-300 rounded-full absolute -top-1 -left-0.5 transform rotate-45"></div>
                </div>
                {/* Tooth */}
                <div className="absolute top-0 left-6 lg:left-8">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 lg:w-16 lg:h-16 text-white fill-current">
                    <path d="M12 2c-1.5 0-3 1-3 3v2c0 1-1 2-2 3s-2 2-2 4v6c0 1 1 2 2 2h2c1 0 2-1 2-2v-6c0-2 1-3 1-4s1-3 1-3v-2c0-2-1.5-3-1-3z"/>
                  </svg>
                  {/* Sparkles */}
                  <div className="absolute -top-2 -right-2">
                    <Star className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-300 fill-current" />
                  </div>
                  <div className="absolute top-2 -left-3">
                    <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-300 fill-current" />
                  </div>
                  <div className="absolute -bottom-1 right-1">
                    <Star className="w-2 h-2 lg:w-3 lg:h-3 text-yellow-300 fill-current" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg font-medium">up to</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold mb-2 sm:mb-3 lg:mb-4 leading-tight">$200 OFF*</h1>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold mb-4 sm:mb-6 lg:mb-8 leading-tight px-2 sm:px-0">SMILE BRIGHT THIS SCHOOL YEAR!</p>
            
            <button 
              className="bg-goto-green text-white px-6 py-3 lg:px-8 lg:py-4 rounded-lg font-bold text-base lg:text-lg hover:bg-goto-dark-green transition-colors duration-200 shadow-lg"
              data-testid="button-hero-book-now"
              onClick={onBookAppointment}
            >
              Book an appointment
            </button>
          </div>
          
          {/* Right Image */}
          <div className="lg:text-right">
            <img 
              src="/team-photo-new.jpg" 
              alt="GoTo Optical team" 
              className="rounded-xl shadow-2xl w-full h-auto max-w-lg mx-auto lg:ml-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

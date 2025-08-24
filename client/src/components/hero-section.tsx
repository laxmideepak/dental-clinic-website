import { Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-gradient text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left z-10 relative">
            {/* Tooth and Pencil Illustration */}
            <div className="mb-8 flex justify-center lg:justify-start">
              <div className="relative">
                {/* Pencil */}
                <div className="relative mr-4">
                  <div className="w-3 h-16 bg-yellow-400 rounded-full transform rotate-45"></div>
                  <div className="w-4 h-4 bg-pink-300 rounded-full absolute -top-1 -left-0.5 transform rotate-45"></div>
                </div>
                {/* Tooth */}
                <div className="absolute top-0 left-8">
                  <svg viewBox="0 0 24 24" className="w-16 h-16 text-white fill-current">
                    <path d="M12 2c-1.5 0-3 1-3 3v2c0 1-1 2-2 3s-2 2-2 4v6c0 1 1 2 2 2h2c1 0 2-1 2-2v-6c0-2 1-3 1-4s1-3 1-3v-2c0-2-1.5-3-1-3z"/>
                  </svg>
                  {/* Sparkles */}
                  <div className="absolute -top-2 -right-2">
                    <Star className="w-5 h-5 text-yellow-300 fill-current" />
                  </div>
                  <div className="absolute top-2 -left-3">
                    <Star className="w-4 h-4 text-yellow-300 fill-current" />
                  </div>
                  <div className="absolute -bottom-1 right-1">
                    <Star className="w-3 h-3 text-yellow-300 fill-current" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-2 text-lg font-medium">up to</div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-4">$200 OFF*</h1>
            <p className="text-xl lg:text-2xl font-semibold mb-8">SMILE BRIGHT THIS SCHOOL YEAR!</p>
            
            <button 
              className="bg-jefferson-pink text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-pink-600 transition-colors duration-200 shadow-lg"
              data-testid="button-hero-book-now"
              onClick={() => window.open('https://www.jeffersondentalclinics.com/2025-back-to-school', '_blank')}
            >
              BOOK NOW & SAVE
            </button>
          </div>
          
          {/* Right Image */}
          <div className="lg:text-right">
            <img 
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Three dental professionals smiling in modern dental office" 
              className="rounded-xl shadow-2xl w-full h-auto max-w-md mx-auto lg:ml-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    text: "Very lovely staff. The doctor and team explained everything thoroughly and gave me an affordable way to pay for my dental work.",
    author: "Mika M."
  },
  {
    text: "My visit was great! Everyone was so nice, respectful, and gentle, always smiling. Thanks for helping me with my payments and answering all my questions and concerns about braces!",
    author: "Yadira M."
  },
  {
    text: "Best experience that I ever had!!! All the workers are so nice and they have helped me so much with my anxiety towards the dentist office. I highly recommend to anyone needing a check-up.",
    author: "Kasandra M."
  }
];

interface TestimonialsCarouselProps {
  onBookAppointment: () => void;
}

export default function TestimonialsCarousel({ onBookAppointment }: TestimonialsCarouselProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          MORE THAN 40,000 5-STAR REVIEWS:
        </h2>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
                  <div className="flex items-center justify-center mb-6">
                    <Quote className="w-8 h-8 text-goto-blue mr-4" />
                    <div className="flex text-yellow-400 text-2xl">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-current" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-lg text-gray-700 text-center mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="text-center">
                    <cite className="font-semibold text-gray-800">{testimonial.author}</cite>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-200"
            data-testid="button-prev-testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-200"
            data-testid="button-next-testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        <div className="text-center mt-12">
          <button 
            className="bg-goto-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-goto-dark-blue transition-colors duration-200"
            data-testid="button-book-from-reviews"
            onClick={onBookAppointment}
          >
            Book Your Appointment
          </button>
        </div>
      </div>
    </section>
  );
}

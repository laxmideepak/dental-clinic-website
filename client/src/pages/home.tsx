import { useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import PromotionalOffers from "@/components/promotional-offers";
import CountdownTimer from "@/components/countdown-timer";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import IteroSection from "@/components/itero-section";
import AdaSafety from "@/components/ada-safety";
import ChatWidget from "@/components/chat-widget";
import BookingModal from "@/components/booking-modal";

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onBookAppointment={openBookingModal} />
      <HeroSection onBookAppointment={openBookingModal} />
      
      {/* Back to School Heading */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
            Back to school savings are in session!
          </h2>
        </div>
      </section>
      
      <PromotionalOffers onBookAppointment={openBookingModal} />
      <CountdownTimer onBookAppointment={openBookingModal} />
      
      {/* Terms */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-sm text-gray-600 space-y-2">
          <p>
            <em>¹ Terms apply. Offer valid for non-covered services only. Discount amount based on total spend. Valid from 7/21/25 to 8/30/25. One per patient. Speak to a team member for more details.</em>
          </p>
          <p>
            <em>² Terms apply. Offer valid on orthodontic treatment only. Must be paid in full to be eligible for discount. Patient eligibility may vary. Valid from 7/21/25 to 8/30/25. One per patient. Speak to a team member for more details.</em>
          </p>
        </div>
      </section>

      {/* Patient Photos Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <img 
              src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Happy dental patient smiling" 
              className="rounded-xl shadow-lg w-full h-64 object-cover" 
            />
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Modern dental office interior" 
              className="rounded-xl shadow-lg w-full h-64 object-cover" 
            />
            <img 
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Patient with braces smiling confidently" 
              className="rounded-xl shadow-lg w-full h-64 object-cover" 
            />
          </div>
          
          <div className="flex justify-center space-x-2">
            <button className="w-3 h-3 rounded-full bg-jefferson-blue"></button>
            <button className="w-3 h-3 rounded-full bg-gray-300"></button>
            <button className="w-3 h-3 rounded-full bg-gray-300"></button>
          </div>
        </div>
      </section>

      <TestimonialsCarousel onBookAppointment={openBookingModal} />
      <IteroSection />
      <AdaSafety />

      {/* Final CTA */}
      <section className="py-16 bg-jefferson-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">
            SAVE UP TO $200* AT YOUR NEXT DENTAL VISIT
          </h2>
          <button 
            className="bg-jefferson-pink text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-pink-600 transition-colors duration-200 shadow-lg"
            data-testid="button-final-appointment"
            onClick={openBookingModal}
          >
            Book Your Appointment
          </button>
        </div>
      </section>

      <ChatWidget />
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </div>
  );
}

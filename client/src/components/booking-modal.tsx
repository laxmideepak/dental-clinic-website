import { useState } from "react";
import { X, ChevronRight } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          data-testid="button-close-modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Header */}
        <div className="p-8 pb-6">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-jefferson-blue rounded-full flex items-center justify-center mr-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2c-1.5 0-3 1-3 3v2c0 1-1 2-2 3s-2 2-2 4v6c0 1 1 2 2 2h2c1 0 2-1 2-2v-6c0-2 1-3 1-4s1-3 1-3v-2c0-2-1.5-3-1-3z"/>
                </svg>
              </div>
              <div>
                <div className="text-jefferson-dark-blue font-bold text-lg">
                  JEFFERSON
                </div>
                <div className="text-xs text-gray-600 -mt-1">
                  DENTAL & ORTHODONTICS
                </div>
              </div>
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Let's Get Started! Are you a...
          </h2>
        </div>
        
        {/* Options */}
        <div className="px-8 pb-8 space-y-4">
          {/* New Patient Option */}
          <button 
            className="w-full bg-jefferson-pink text-white p-6 rounded-xl hover:bg-pink-600 transition-colors duration-200 group"
            data-testid="button-new-patient"
            onClick={() => window.open('https://www.jeffersondentalclinics.com/2025-back-to-school', '_blank')}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-xl font-bold mb-2">New Patient</div>
                <div className="text-sm opacity-90">
                  Your First Visit Includes An Exam, Necessary X-Rays, And A Check-Up.
                </div>
              </div>
              <ChevronRight className="w-6 h-6 flex-shrink-0 ml-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </button>
          
          {/* Current Patient Option */}
          <button 
            className="w-full bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition-colors duration-200 group"
            data-testid="button-current-patient"
            onClick={() => window.open('https://www.jeffersondentalclinics.com/2025-back-to-school', '_blank')}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-xl font-bold mb-2">Current Patient</div>
                <div className="text-sm opacity-90">
                  Book An Exam, Cleaning, Or Follow-Up Treatment Based On Your Dental Needs.
                </div>
              </div>
              <ChevronRight className="w-6 h-6 flex-shrink-0 ml-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
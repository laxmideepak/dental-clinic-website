import { ArrowRight, X } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

export default function BookingPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'patient-type' | 'appointment-type'>('patient-type');

  const handleClose = () => {
    setLocation("/");
  };

  const handleNewPatient = () => {
    setStep('appointment-type');
  };

  const handleCurrentPatient = () => {
    setStep('appointment-type');
  };

  const handleGeneralOptometry = () => {
    window.open('https://www.gotooptical.com/book-online', '_blank');
  };

  const handleContactLensFitting = () => {
    window.open('https://www.gotooptical.com/book-online', '_blank');
  };

  const handleChat = () => {
    // Handle chat functionality
    console.log('Open chat');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Header */}
        <div className="p-8 pb-6">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div className="flex items-center mr-3">
                <span className="text-goto-green font-bold text-xl">G</span>
                <div className="flex items-center mx-1">
                  <div className="w-3 h-3 bg-goto-blue rounded-full border-2 border-goto-blue"></div>
                  <div className="w-1 h-1 bg-goto-blue mx-1"></div>
                  <div className="w-3 h-3 bg-goto-blue rounded-full border-2 border-goto-blue"></div>
                </div>
                <span className="text-goto-green font-bold text-xl">T</span>
              </div>
              <div>
                <div className="text-goto-green font-bold text-lg">
                  GoTo Optical
                </div>
                <div className="text-xs text-gray-600 -mt-1">
                  EYEWEAR + EYECARE
                </div>
              </div>
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            {step === 'patient-type' ? "Let's Get Started! Are you a..." : "I'm Scheduling an Appointment for:"}
          </h2>
        </div>
        
        {/* Options */}
        <div className="px-8 pb-8 space-y-4">
          {step === 'patient-type' ? (
            <>
              {/* New Patient */}
              <button 
                className="w-full bg-goto-green text-white p-6 rounded-xl hover:bg-goto-dark-green transition-colors duration-200 group text-left"
                onClick={handleNewPatient}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-xl font-bold mb-2">New Patient</div>
                    <div className="text-sm opacity-90">
                      Your First Visit Includes An Eye Exam, Necessary Tests, And A Consultation.
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>

              {/* Current Patient */}
              <button 
                className="w-full bg-goto-blue text-white p-6 rounded-xl hover:bg-goto-dark-blue transition-colors duration-200 group text-left"
                onClick={handleCurrentPatient}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-xl font-bold mb-2">Current Patient</div>
                    <div className="text-sm opacity-90">
                      Book An Eye Exam, Contact Lens Fitting, Or Follow-Up Treatment Based On Your Vision Needs.
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>
            </>
          ) : (
            <>
              {/* General Optometry */}
              <button 
                className="w-full bg-blue-400 text-white p-6 rounded-xl hover:bg-blue-500 transition-colors duration-200 group text-left"
                onClick={handleGeneralOptometry}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-xl font-bold mb-2">General Optometry</div>
                    <div className="text-sm opacity-90">
                      (Eye Exam, Vision Test, Glasses Prescription, Etc)
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>

              {/* Contact Lens Fitting */}
              <button 
                className="w-full bg-teal-600 text-white p-6 rounded-xl hover:bg-teal-700 transition-colors duration-200 group text-left"
                onClick={handleContactLensFitting}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-xl font-bold mb-2">Contact Lens Fitting</div>
                    <div className="text-sm opacity-90">
                      Please Call +1 (214) 550-5005 To Schedule Appt.
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>

              {/* Chat Option */}
              <button 
                className="w-full bg-green-400 text-gray-800 p-6 rounded-xl hover:bg-green-500 transition-colors duration-200 group text-left"
                onClick={handleChat}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-xl font-bold">Or Click Here To Chat</div>
                  </div>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

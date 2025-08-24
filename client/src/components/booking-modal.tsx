import { useState, useEffect } from "react";
import { X, ChevronRight } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<'patient-type' | 'appointment-type' | 'date-time' | 'finish-scheduling'>('patient-type');

  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('patient-type');
    }
  }, [isOpen]);

  const handleNewPatient = () => {
    setStep('appointment-type');
  };

  const handleCurrentPatient = () => {
    setStep('appointment-type');
  };

  const handleGeneralOptometry = () => {
    console.log('Setting step to date-time');
    setStep('date-time');
  };

  const handleContactLensFitting = () => {
    console.log('Setting step to date-time for contact lens fitting');
    setStep('date-time');
  };

  const handleChat = () => {
    console.log('Open chat');
  };

  const handleBack = () => {
    if (step === 'finish-scheduling') {
      setStep('date-time');
    } else if (step === 'date-time') {
      setStep('appointment-type');
    } else {
      setStep('patient-type');
    }
  };

  const handleCallUs = () => {
    window.open('tel:+12145505005');
  };

  const handleTimeSlotSelect = () => {
    setStep('finish-scheduling');
  };

  const handleScheduleAppointment = () => {
    // Handle form submission
    console.log('Scheduling appointment...');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-900 flex items-center justify-center z-50">
      <div className="bg-white w-full h-full max-w-md max-h-full overflow-y-auto">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
          data-testid="button-close-modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Header */}
        <div className="p-8 pb-6">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/logo.jpg" 
              alt="GoTo Optical - EYEWEAR + EYECARE" 
              className="h-16 w-auto"
            />
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            {step === 'patient-type' ? "Let's Get Started! Are you a..." : 
             step === 'appointment-type' ? "I'm Scheduling an Appointment for:" :
             step === 'date-time' ? "Select Date and Time" :
             "Finish Scheduling your Appointment"}
          </h2>
        </div>
        
        {/* Options */}
        <div className="px-8 pb-8 space-y-4">
          {step === 'patient-type' && (
            <>
              {/* New Patient Option */}
              <button 
                className="w-full bg-pink-500 text-white p-6 hover:bg-pink-600 transition-colors duration-200 group"
                data-testid="button-new-patient"
                onClick={handleNewPatient}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-xl font-bold mb-2">New Patient</div>
                    <div className="text-sm opacity-90">
                      Your First Visit Includes An Eye Exam, Necessary Tests, And A Consultation.
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 flex-shrink-0 ml-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>
              
              {/* Current Patient Option */}
              <button 
                className="w-full bg-purple-600 text-white p-6 hover:bg-purple-700 transition-colors duration-200 group"
                data-testid="button-current-patient"
                onClick={handleCurrentPatient}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-xl font-bold mb-2">Current Patient</div>
                    <div className="text-sm opacity-90">
                      Book An Eye Exam, Contact Lens Fitting, Or Follow-Up Treatment Based On Your Vision Needs.
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 flex-shrink-0 ml-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>
            </>
          )}

          {step === 'appointment-type' && (
            <>
              {/* Back Button */}
              <button 
                onClick={handleBack}
                className="text-goto-blue hover:text-goto-dark-blue mb-4 flex items-center"
              >
                <ChevronRight className="w-4 h-4 rotate-180 mr-2" />
                Back
              </button>

              {/* General Optometry */}
              <button 
                className="w-full bg-blue-400 text-white p-6 rounded-xl hover:bg-blue-500 transition-colors duration-200 group"
                onClick={handleGeneralOptometry}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-xl font-bold mb-2">General Optometry</div>
                    <div className="text-sm opacity-90">
                      (Eye Exam, Vision Test, Glasses Prescription, Etc)
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 flex-shrink-0 ml-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>

              {/* Contact Lens Fitting */}
              <button 
                className="w-full bg-teal-600 text-white p-6 rounded-xl hover:bg-teal-700 transition-colors duration-200 group"
                onClick={handleContactLensFitting}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-xl font-bold mb-2">Contact Lens Fitting</div>
                    <div className="text-sm opacity-90">
                      Please Call +1 (214) 550-5005 To Schedule Appt.
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 flex-shrink-0 ml-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>

              {/* Chat Option */}
              <button 
                className="w-full bg-green-400 text-gray-800 p-6 rounded-xl hover:bg-green-500 transition-colors duration-200 group"
                onClick={handleChat}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-xl font-bold">Or Click Here To Chat</div>
                  </div>
                  <ChevronRight className="w-6 h-6 flex-shrink-0 ml-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>
            </>
          )}

          {step === 'date-time' && (
            <>
              {/* Back Button */}
              <button 
                onClick={handleBack}
                className="text-goto-blue hover:text-goto-dark-blue mb-4 flex items-center"
              >
                <ChevronRight className="w-4 h-4 rotate-180 mr-2" />
                Back
              </button>

              {/* Location */}
              <div className="mb-6">
                <div className="text-lg font-semibold text-gray-800 mb-2">Dallas Office</div>
                <div className="flex items-center text-sm text-gray-600">
                  <span>Month View</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

                             {/* Available Times */}
               <div className="space-y-6 mb-6">
                 {/* Monday */}
                 <div>
                   <div className="text-sm font-semibold text-gray-800 mb-3">Monday, Aug. 25</div>
                   <div className="grid grid-cols-4 gap-2">
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">2:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">2:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">5:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">5:30 PM</button>
                   </div>
                 </div>

                 {/* Tuesday */}
                 <div>
                   <div className="text-sm font-semibold text-gray-800 mb-3">Tuesday, Aug. 26</div>
                   <div className="grid grid-cols-4 gap-2">
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">2:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">2:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">5:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">5:30 PM</button>
                   </div>
                 </div>

                 {/* Wednesday */}
                 <div>
                   <div className="text-sm font-semibold text-gray-800 mb-3">Wednesday, Aug. 27</div>
                   <div className="grid grid-cols-4 gap-2">
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">2:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">2:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">5:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">5:30 PM</button>
                   </div>
                 </div>

                 {/* Thursday */}
                 <div>
                   <div className="text-sm font-semibold text-gray-800 mb-3">Thursday, Aug. 28</div>
                   <div className="grid grid-cols-4 gap-2">
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">2:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">2:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">5:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">5:30 PM</button>
                   </div>
                 </div>

                 {/* Friday */}
                 <div>
                   <div className="text-sm font-semibold text-gray-800 mb-3">Friday, Aug. 29</div>
                   <div className="grid grid-cols-4 gap-2">
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">2:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">2:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">5:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">5:30 PM</button>
                   </div>
                 </div>

                 {/* Saturday */}
                 <div>
                   <div className="text-sm font-semibold text-gray-800 mb-3">Saturday, Aug. 30</div>
                   <div className="grid grid-cols-4 gap-2">
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">9:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">10:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:10 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:30 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">11:50 AM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">12:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">2:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">2:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:30 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">3:50 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:10 PM</button>
                     <button onClick={handleTimeSlotSelect} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm hover:bg-blue-200 transition-colors font-medium">4:30 PM</button>
                   </div>
                 </div>
               </div>

              {/* View More Days Button */}
              <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded mb-6 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
                <span>VIEW MORE DAYS</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Call Us Button */}
              <button 
                onClick={handleCallUs}
                className="w-full bg-goto-green text-white py-4 px-6 rounded font-semibold hover:bg-goto-dark-green transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                NEED HELP? CALL US!
                             </button>
             </>
           )}

           {step === 'finish-scheduling' && (
             <>
               {/* Back Button */}
               <button 
                 onClick={handleBack}
                 className="text-goto-blue hover:text-goto-dark-blue mb-4 flex items-center"
               >
                 <ChevronRight className="w-4 h-4 rotate-180 mr-2" />
                 Back
               </button>

               {/* Form Fields */}
               <div className="space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                   <input 
                     type="text" 
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent"
                     placeholder="Enter your first name"
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                   <input 
                     type="text" 
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent"
                     placeholder="Enter your last name"
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                   <input 
                     type="tel" 
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent"
                     placeholder="Enter your phone number"
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                   <input 
                     type="email" 
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent"
                     placeholder="Enter your email"
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth (mm-dd-yyyy)</label>
                   <input 
                     type="text" 
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent"
                     placeholder="mm-dd-yyyy"
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">What is the main reason for your visit?</label>
                   <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent">
                     <option value="">Select a reason</option>
                     <option value="eye-exam">Eye Exam</option>
                     <option value="glasses">Glasses Prescription</option>
                     <option value="contact-lens">Contact Lens Fitting</option>
                     <option value="follow-up">Follow-up Visit</option>
                     <option value="emergency">Emergency Visit</option>
                   </select>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Do you plan on using vision insurance during your visit?</label>
                   <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent">
                     <option value="">Select an option</option>
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                     <option value="unsure">I'm not sure</option>
                   </select>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us?</label>
                   <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent">
                     <option value="">Select an option</option>
                     <option value="google">Google Search</option>
                     <option value="social-media">Social Media</option>
                     <option value="friend">Friend/Family</option>
                     <option value="advertisement">Advertisement</option>
                     <option value="other">Other</option>
                   </select>
                 </div>

                 {/* Note */}
                 <div className="text-sm text-blue-600 mt-4">
                   Note: By booking an appointment, you agree to provide at least 24 hours' notice for any rescheduling or cancellations.
                 </div>

                 {/* Checkbox */}
                 <div className="flex items-start mt-4">
                   <input 
                     type="checkbox" 
                     id="consent" 
                     className="mt-1 mr-3"
                     defaultChecked
                   />
                   <label htmlFor="consent" className="text-sm text-gray-700">
                     Yes, I understand that by checking this box I am agreeing to receive email and text messages from GoTo Optical regarding upcoming appointments, promotions and services and can unsubscribe at any time.
                   </label>
                 </div>

                 {/* Schedule Button */}
                 <button 
                   onClick={handleScheduleAppointment}
                   className="w-full bg-goto-green text-white py-4 px-6 rounded font-semibold hover:bg-goto-dark-green transition-colors duration-200 mt-6"
                 >
                   SCHEDULE AN APPOINTMENT
                 </button>
               </div>
             </>
           )}
         </div>
       </div>
     </div>
   );
 }
import { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { bookAppointment, getExistingAppointments, type Appointment } from "../lib/supabase";
import { sendBookingNotification, type BookingEmailData } from "../lib/email";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<'patient-type' | 'appointment-type' | 'date-time' | 'finish-scheduling'>('patient-type');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [appointmentData, setAppointmentData] = useState({
    patientType: '',
    service: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    reasonForVisit: '',
    hasInsurance: '',
    howHeard: '',
    notes: '',
    consent: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('patient-type');
      setSelectedDate(null);
      setSelectedTime(null);
      setCurrentMonth(new Date());
      setSubmitError(null);
      setBookedSlots([]);
      setAppointmentData({
        patientType: '',
        service: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        reasonForVisit: '',
        hasInsurance: '',
        howHeard: '',
        notes: '',
        consent: true
      });
    }
  }, [isOpen]);

  // Helper functions for calendar
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    const twoMonthsFromNow = new Date();
    twoMonthsFromNow.setMonth(today.getMonth() + 2);
    
    return date >= today && date <= twoMonthsFromNow && date.getDay() !== 0; // Exclude Sundays
  };

  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${days[date.getDay()]}, ${months[date.getMonth()]}. ${date.getDate()}`;
  };

  const generateTimeSlots = (date: Date) => {
    const slots = [];
    const isSaturday = date.getDay() === 6;
    
    // Morning slots: 9:10 AM - 1:10 PM (20-minute intervals)
    for (let hour = 9; hour <= 13; hour++) {
      for (let minute = 10; minute <= 50; minute += 20) {
        if (hour === 13 && minute > 10) break; // Stop at 1:10 PM
        const time = new Date(date);
        time.setHours(hour, minute, 0, 0);
        slots.push(time);
      }
    }
    
    // Afternoon slots: 2:30 PM - 5:30 PM (Saturday until 4:30 PM)
    const endHour = isSaturday ? 16 : 17; // 4 PM or 5 PM
    const endMinute = isSaturday ? 30 : 30; // 4:30 PM or 5:30 PM
    
    for (let hour = 14; hour <= endHour; hour++) {
      for (let minute = 30; minute <= 50; minute += 20) {
        if (hour === endHour && minute > endMinute) break;
        const time = new Date(date);
        time.setHours(hour, minute, 0, 0);
        slots.push(time);
      }
    }
    
    return slots;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleNewPatient = () => {
    console.log('🔄 Setting step to appointment-type');
    setAppointmentData(prev => ({ ...prev, patientType: 'New Patient' }));
    setStep('appointment-type');
  };

  const handleCurrentPatient = () => {
    console.log('🔄 Setting step to appointment-type');
    setAppointmentData(prev => ({ ...prev, patientType: 'Current Patient' }));
    setStep('appointment-type');
  };

  const handleGeneralOptometry = () => {
    console.log('🔄 Setting step to date-time');
    setAppointmentData(prev => ({ ...prev, service: 'General Optometry' }));
    setStep('date-time');
  };

  const handleContactLensFitting = () => {
    console.log('🔄 Setting step to date-time');
    setAppointmentData(prev => ({ ...prev, service: 'Contact Lens Fitting' }));
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

  const handleDateSelect = async (date: Date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      
          // Fetch existing appointments for this date
    try {
      const existingAppointments = await getExistingAppointments(date.toISOString().split('T')[0]);
      const bookedTimes = existingAppointments.map((apt: any) => {
        // Create a date object from the stored UTC time
        const appointmentTime = new Date(apt.starts_at);
        
        // Convert back to the original local time that was booked
        // Since we stored local time as UTC, we need to adjust it back
        const localTime = new Date(appointmentTime.getTime() + (appointmentTime.getTimezoneOffset() * 60000));
        const timeString = localTime.toTimeString().slice(0, 5); // Gets "HH:MM"
        
        console.log('🕐 Processing appointment:', apt.starts_at, '→ UTC time:', appointmentTime.toLocaleTimeString(), '→ Corrected local:', timeString);
        return timeString;
      });
      setBookedSlots(bookedTimes);
      console.log('📅 Booked slots for', date.toDateString(), ':', bookedTimes);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
      setBookedSlots([]);
    }
    }
  };

  const handleTimeSlotSelect = (slot: Date) => {
    setSelectedTime(slot);
    setStep('finish-scheduling');
  };

  const handlePreviousMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() - 1);
    
    // Don't allow going before current month
    const today = new Date();
    if (newMonth >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(newMonth);
    }
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + 1);
    
    // Don't allow going beyond 2 months from now
    const today = new Date();
    const twoMonthsFromNow = new Date(today.getFullYear(), today.getMonth() + 2, 1);
    if (newMonth <= twoMonthsFromNow) {
      setCurrentMonth(newMonth);
    }
  };

  const handleScheduleAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTime || !appointmentData.email) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Format the time to preserve the local timezone
      const localTimeString = new Date(selectedTime.getTime() - (selectedTime.getTimezoneOffset() * 60000)).toISOString();
      
      const appointmentPayload = {
        customer_email: appointmentData.email,
        customer_name: appointmentData.firstName && appointmentData.lastName 
          ? `${appointmentData.firstName} ${appointmentData.lastName}`.trim()
          : appointmentData.firstName || appointmentData.lastName || undefined,
        service: appointmentData.service,
        starts_at: localTimeString,
        notes: [
          appointmentData.reasonForVisit && `Reason: ${appointmentData.reasonForVisit}`,
          appointmentData.phone && `Phone: ${appointmentData.phone}`,
          appointmentData.dateOfBirth && `DOB: ${appointmentData.dateOfBirth}`,
          appointmentData.hasInsurance && `Insurance: ${appointmentData.hasInsurance}`,
          appointmentData.howHeard && `How heard: ${appointmentData.howHeard}`,
          appointmentData.notes && `Additional notes: ${appointmentData.notes}`
        ].filter(Boolean).join('\n')
      };

      await bookAppointment(appointmentPayload);
      
      // Send email notification to admin
      try {
        const emailData: BookingEmailData = {
          patientType: appointmentData.patientType as 'current' | 'new',
          appointmentType: appointmentData.service as 'general' | 'contact-lens',
          appointmentDate: selectedTime.toLocaleDateString(),
          appointmentTime: selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          customerInfo: {
            firstName: appointmentData.firstName,
            lastName: appointmentData.lastName,
            email: appointmentData.email,
            phone: appointmentData.phone,
            dateOfBirth: appointmentData.dateOfBirth,
            insurance: appointmentData.hasInsurance || undefined,
            reasonForVisit: appointmentData.reasonForVisit || undefined,
          }
        };

        const emailSent = await sendBookingNotification(emailData);
        if (emailSent) {
          console.log('📧 Email notification sent successfully');
        } else {
          console.log('📧 Email notification failed, but appointment was still booked');
        }
      } catch (emailError) {
        console.error('📧 Error sending email notification:', emailError);
        // Don't fail the booking if email fails
      }
      
      // Success! Close modal and show success message
      alert('Appointment booked successfully! We will contact you soon to confirm.');
      onClose();
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      setSubmitError(error.message || 'Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  console.log('🎯 Current step:', step);

  return (
    <div className="fixed inset-0 bg-blue-900 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white w-full h-full sm:max-w-md sm:max-h-[95vh] sm:rounded-lg overflow-y-auto">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
          data-testid="button-close-modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Header */}
        <div className="p-4 sm:p-8 pb-4 sm:pb-6">
          {/* Logo */}
          <div className="flex justify-center mb-4 sm:mb-8">
            <img 
              src="/logo.jpg" 
              alt="GoTo Optical - EYEWEAR + EYECARE" 
              className="h-12 sm:h-16 w-auto"
            />
          </div>
          
          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-8 leading-tight px-2">
            {step === 'patient-type' ? "Let's Get Started! Are you a..." : 
             step === 'appointment-type' ? "I'm Scheduling an Appointment for:" :
             step === 'date-time' ? "Select Date and Time" :
             "Finish Scheduling your Appointment"}
          </h2>
        </div>
        
        {/* Options */}
        <div className="px-4 sm:px-8 pb-4 sm:pb-8 space-y-3 sm:space-y-4">
          {step === 'patient-type' && (
            <>
              {/* New Patient Option */}
              <button 
                className="w-full bg-pink-500 text-white p-4 sm:p-6 hover:bg-pink-600 transition-colors duration-200 group touch-manipulation"
                data-testid="button-new-patient"
                onClick={handleNewPatient}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left flex-1 pr-3">
                    <div className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">New Patient</div>
                    <div className="text-xs sm:text-sm opacity-90 leading-tight">
                      Your First Visit Includes An Eye Exam, Necessary Tests, And A Consultation.
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ml-2 sm:ml-4 group-hover:translate-x-1 transition-transform duration-200" />
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

              {/* Calendar */}
              <div className="bg-white border rounded-lg mb-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <button 
                    onClick={handlePreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    disabled={currentMonth.getMonth() === new Date().getMonth()}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <h3 className="text-lg font-semibold">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  
                  <button 
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    disabled={currentMonth.getMonth() >= new Date().getMonth() + 2}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="p-4">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: getFirstDayOfMonth(currentMonth) }, (_, i) => (
                      <div key={`empty-${i}`} className="h-10" />
                    ))}
                    
                    {/* Days of the month */}
                    {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => {
                      const day = i + 1;
                      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                      const isAvailable = isDateAvailable(date);
                      const isSelected = selectedDate && 
                        selectedDate.toDateString() === date.toDateString();
                      
                      return (
                        <button
                          key={day}
                          onClick={() => handleDateSelect(date)}
                          disabled={!isAvailable}
                          className={`h-10 text-sm rounded-md transition-colors ${
                            isSelected
                              ? 'bg-goto-blue text-white'
                              : isAvailable
                              ? 'hover:bg-blue-100 text-gray-800'
                              : 'text-gray-300 cursor-not-allowed'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Time Slots - Only show when date is selected */}
              {selectedDate && (
                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-800 mb-3">
                    Available times for {formatDate(selectedDate)}
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {generateTimeSlots(selectedDate).map((slot, index) => {
                      // Check if this slot is already booked using simple time comparison
                      const slotTimeString = slot.toTimeString().slice(0, 5); // Gets "HH:MM"
                      const isBooked = bookedSlots.includes(slotTimeString);
                      
                      // Debug logging for the first few slots
                      if (index < 3) {
                        console.log('🔍 Slot', formatTime(slot), ':', {
                          slotTimeString,
                          bookedSlots,
                          isBooked
                        });
                      }
                      
                      return (
                        <button
                          key={index}
                          onClick={() => !isBooked && handleTimeSlotSelect(slot)}
                          disabled={isBooked}
                          className={`px-3 py-2 rounded-md text-sm transition-colors font-medium ${
                            isBooked 
                              ? 'bg-red-100 text-red-500 cursor-not-allowed opacity-50' 
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}
                        >
                          {formatTime(slot)} {isBooked && '(Booked)'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

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
              <form onSubmit={handleScheduleAppointment} className="space-y-4">
                {submitError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {submitError}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    value={appointmentData.firstName}
                    onChange={(e) => setAppointmentData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    value={appointmentData.lastName}
                    onChange={(e) => setAppointmentData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={appointmentData.phone}
                    onChange={(e) => setAppointmentData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input 
                    type="email" 
                    required
                    value={appointmentData.email}
                    onChange={(e) => setAppointmentData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth (mm-dd-yyyy)</label>
                   <input 
                     type="text" 
                     value={appointmentData.dateOfBirth}
                     onChange={(e) => setAppointmentData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent"
                     placeholder="mm-dd-yyyy"
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">What is the main reason for your visit?</label>
                   <select 
                     value={appointmentData.reasonForVisit}
                     onChange={(e) => setAppointmentData(prev => ({ ...prev, reasonForVisit: e.target.value }))}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent"
                   >
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
                   <select 
                     value={appointmentData.hasInsurance}
                     onChange={(e) => setAppointmentData(prev => ({ ...prev, hasInsurance: e.target.value }))}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent"
                   >
                     <option value="">Select an option</option>
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                     <option value="unsure">I'm not sure</option>
                   </select>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us?</label>
                   <select 
                     value={appointmentData.howHeard}
                     onChange={(e) => setAppointmentData(prev => ({ ...prev, howHeard: e.target.value }))}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent"
                   >
                     <option value="">Select an option</option>
                     <option value="google">Google Search</option>
                     <option value="social-media">Social Media</option>
                     <option value="friend">Friend/Family</option>
                     <option value="advertisement">Advertisement</option>
                     <option value="other">Other</option>
                   </select>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                   <textarea 
                     value={appointmentData.notes}
                     onChange={(e) => setAppointmentData(prev => ({ ...prev, notes: e.target.value }))}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-goto-blue focus:border-transparent"
                     rows={3}
                     placeholder="Any additional information or special requests"
                   />
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
                     checked={appointmentData.consent}
                     onChange={(e) => setAppointmentData(prev => ({ ...prev, consent: e.target.checked }))}
                     className="mt-1 mr-3"
                   />
                   <label htmlFor="consent" className="text-sm text-gray-700">
                     Yes, I understand that by checking this box I am agreeing to receive email and text messages from GoTo Optical regarding upcoming appointments, promotions and services and can unsubscribe at any time.
                   </label>
                 </div>

                 {/* Schedule Button */}
                 <button 
                   type="submit"
                   disabled={isSubmitting || !appointmentData.email || !appointmentData.consent}
                   className="w-full bg-goto-green text-white py-4 px-6 rounded font-semibold hover:bg-goto-dark-green transition-colors duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {isSubmitting ? 'SCHEDULING...' : 'SCHEDULE AN APPOINTMENT'}
                 </button>
               </form>
             </>
           )}
         </div>
       </div>
     </div>
   );
 }
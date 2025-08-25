import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  onBookAppointment: () => void;
}

export default function CountdownTimer({ onBookAppointment }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 6,
    hours: 2,
    minutes: 12,
    seconds: 3
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        seconds--;
        
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          
          if (minutes < 0) {
            minutes = 59;
            hours--;
            
            if (hours < 0) {
              hours = 23;
              days--;
              
              if (days < 0) {
                // Reset to original values when countdown reaches 0
                return { days: 6, hours: 2, minutes: 12, seconds: 3 };
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown-gradient text-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto text-center px-3 sm:px-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight">Our special offers expire in:</h2>
        
        <div className="flex justify-center items-center space-x-2 sm:space-x-4 lg:space-x-8 mb-6 sm:mb-8">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold" data-testid="countdown-days">
              {timeLeft.days}
            </div>
            <div className="text-xs sm:text-sm lg:text-lg text-gray-300">days</div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-4xl">:</div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold" data-testid="countdown-hours">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm lg:text-lg text-gray-300">hours</div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-4xl">:</div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold" data-testid="countdown-minutes">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm lg:text-lg text-gray-300">minutes</div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-4xl">:</div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold" data-testid="countdown-seconds">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm lg:text-lg text-gray-300">seconds</div>
          </div>
        </div>
        
        <button 
          className="bg-goto-green text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base lg:text-lg hover:bg-goto-dark-green transition-colors duration-200 shadow-lg touch-manipulation"
          data-testid="button-countdown-book"
          onClick={onBookAppointment}
        >
          BOOK NOW AND SAVE
        </button>
      </div>
    </section>
  );
}

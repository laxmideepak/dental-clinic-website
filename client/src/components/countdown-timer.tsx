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
    <section className="countdown-gradient text-white py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-8">Our special offers expire in:</h2>
        
        <div className="flex justify-center items-center space-x-8 mb-8">
          <div className="text-center">
            <div className="text-5xl lg:text-6xl font-bold" data-testid="countdown-days">
              {timeLeft.days}
            </div>
            <div className="text-lg text-gray-300">days</div>
          </div>
          <div className="text-4xl">:</div>
          <div className="text-center">
            <div className="text-5xl lg:text-6xl font-bold" data-testid="countdown-hours">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-lg text-gray-300">hours</div>
          </div>
          <div className="text-4xl">:</div>
          <div className="text-center">
            <div className="text-5xl lg:text-6xl font-bold" data-testid="countdown-minutes">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-lg text-gray-300">minutes</div>
          </div>
          <div className="text-4xl">:</div>
          <div className="text-center">
            <div className="text-5xl lg:text-6xl font-bold" data-testid="countdown-seconds">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-lg text-gray-300">seconds</div>
          </div>
        </div>
        
        <button 
                      className="bg-goto-green text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-goto-dark-green transition-colors duration-200 shadow-lg"
          data-testid="button-countdown-book"
          onClick={onBookAppointment}
        >
          BOOK NOW AND SAVE
        </button>
      </div>
    </section>
  );
}

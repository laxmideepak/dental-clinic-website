import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-goto-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Column 1: GoTo Optical (About Us) */}
          <div>
            <div className="mb-4">
              <div className="font-bold text-lg lg:text-xl xl:text-2xl mb-1">
                <span className="text-goto-green">GoTo</span>
                <span className="text-white"> Optical</span>
              </div>
              <div className="text-xs lg:text-sm text-goto-green mb-3 lg:mb-4">
                EYEWEAR + EYECARE
              </div>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              Your trusted DFW eye care professionals providing comprehensive vision services for the whole family.
            </p>
          </div>

          {/* Column 2: Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-200 mr-3 mt-0.5 flex-shrink-0" />
                <a 
                  href="https://maps.google.com/?q=4396+Dallas+Fort+Worth+Turnpike+Ste+107,+Dallas,+TX+75211" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-200 hover:text-white transition-colors duration-200"
                >
                  4396 Dallas Fort Worth Turnpike Ste 107, Dallas, TX 75211
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-200 mr-3 flex-shrink-0" />
                <a 
                  href="tel:+12145505005" 
                  className="text-sm text-gray-200 hover:text-white transition-colors duration-200"
                >
                  +1 (214) 550-5005
                </a>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-200 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-200">Same Day Appointments Available</span>
              </div>
            </div>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-200">• Comprehensive Eye Exams</li>
              <li className="text-sm text-gray-200">• Contact Lenses</li>
              <li className="text-sm text-gray-200">• Designer Eyewear</li>
              <li className="text-sm text-gray-200">• Same Day Service</li>
            </ul>
          </div>

          {/* Column 4: Store Timings */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Store Timings</h3>
            <div className="space-y-2 text-sm text-gray-200">
              <div className="flex justify-between">
                <span>Monday:</span>
                <span>9:00 am - 7:00 pm</span>
              </div>
              <div className="flex justify-between">
                <span>Tuesday:</span>
                <span>9:00 am - 7:00 pm</span>
              </div>
              <div className="flex justify-between">
                <span>Wednesday:</span>
                <span>9:00 am - 7:00 pm</span>
              </div>
              <div className="flex justify-between">
                <span>Thursday:</span>
                <span>9:00 am - 7:00 pm</span>
              </div>
              <div className="flex justify-between">
                <span>Friday:</span>
                <span>9:00 am - 7:00 pm</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>9:00 am - 6:00 pm</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-600 mt-6 lg:mt-8 pt-6 lg:pt-8 text-center">
          <p className="text-xs lg:text-sm text-gray-200">
            © 2025 Goto Optical. All rights reserved. | Se Habla Español
          </p>
        </div>
      </div>
    </footer>
  );
}

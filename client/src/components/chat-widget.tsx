import { useState } from "react";
import { X } from "lucide-react";

export default function ChatWidget() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-goto-blue rounded-full flex items-center justify-center mr-3">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
              <path d="M12 2c-1.5 0-3 1-3 3v2c0 1-1 2-2 3s-2 2-2 4v6c0 1 1 2 2 2h2c1 0 2-1 2-2v-6c0-2 1-3 1-4s1-3 1-3v-2c0-2-1.5-3-1-3z"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm">Hi there, have a question?</div>
            <div className="text-xs text-gray-600">Text us here!</div>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600"
            data-testid="button-close-chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

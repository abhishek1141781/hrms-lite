import React from 'react';
import { Loader2, AlertCircle, Inbox } from 'lucide-react';

// 1. Loading State Component
export const LoadingState = ({ message = "Loading data..." }) => (
  <div className="flex flex-col items-center justify-center p-12 text-indigo-600">
    <Loader2 className="w-10 h-10 animate-spin mb-4" />
    <p className="font-medium animate-pulse">{message}</p>
  </div>
);

// 2. Empty State Component
export const EmptyState = ({ message = "No records found." }) => (
  <div className="flex flex-col items-center justify-center p-12 text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed">
    <Inbox className="w-10 h-10 mb-2 opacity-20" />
    <p className="italic text-sm">{message}</p>
  </div>
);

// 3. Error Alert Component (Reusable for inline errors)
export const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex justify-between items-center shadow-sm rounded-r-lg">
      <div className="flex items-center gap-3">
        <AlertCircle className="text-red-500" size={20} />
        <p className="text-red-700 font-medium">{message}</p>
      </div>
      <button onClick={onClose} className="text-red-400 hover:text-red-600 font-bold text-xl">&times;</button>
    </div>
  );
};
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({ message, className = '' }) => {
  return (
    <div className={`flex items-center justify-center p-8 text-red-600 ${className}`}>
      <AlertTriangle className="w-6 h-6 mr-2" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;


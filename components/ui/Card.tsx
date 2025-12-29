import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export default function Card({ children, className = '', hover = false, gradient = false }: CardProps) {
  return (
    <div 
      className={`
        ${gradient ? 'bg-gradient-to-br from-white to-gray-50' : 'bg-white'}
        rounded-2xl shadow-lg shadow-gray-200/50 
        border border-gray-100/80
        overflow-hidden
        backdrop-blur-sm
        ${hover ? 'transition-all duration-500 hover:shadow-2xl hover:shadow-gray-300/60 hover:-translate-y-2 hover:border-red-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
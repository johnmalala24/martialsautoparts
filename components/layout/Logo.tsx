'use client';

import Link from 'next/link';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  showFallback?: boolean;
  linkHref?: string;
}

export default function Logo({ 
  width = 120, 
  height = 60, 
  className = 'h-12 w-auto object-contain',
  showFallback = true,
  linkHref = '/'
}: LogoProps) {
  const logoContent = (
    <div className="relative flex items-center min-h-[48px]">
      <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent whitespace-nowrap">
        Martial&apos;s Auto Parts
      </span>
    </div>
  );

  if (linkHref) {
    return (
      <Link href={linkHref} className="flex items-center">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}



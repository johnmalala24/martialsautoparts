import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Martial's Auto Parts",
  description: 'For a ride in perfect flow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-neutral-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollManager from '@/components/ScrollManager';
import CustomCursor from '@/components/CustomCursor';

export const metadata = {
  title: 'Portfolio | Full-Stack Developer & Creative Technologist',
  description: 'Full-Stack Developer specializing in React, Next.js, Three.js & Firebase. Building scalable, performant, and visually stunning web applications.',
  keywords: ['portfolio', 'developer', 'react', 'next.js', 'three.js', 'firebase', 'web development'],
  openGraph: {
    title: 'Portfolio | Full-Stack Developer',
    description: 'Building digital experiences that stand out.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CustomCursor />
        <ScrollManager>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ScrollManager>
      </body>
    </html>

  );
}

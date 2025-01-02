import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sulphurPoint = localFont({
  src: [
    {
      path: './fonts/SulphurPoint-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/SulphurPoint-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SulphurPoint-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sulphur-point',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Geoff Vrijmoet",
  description: "Filmmaker • Web Developer • Podcast Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${sulphurPoint.variable} font-sans font-normal antialiased`}>
        {children}
      </body>
    </html>
  );
}

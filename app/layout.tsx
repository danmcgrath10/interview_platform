import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import {Toaster} from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jobi",
  description: "Jobi is an AI-powered interview platform that " +
      "helps companies screen candidates faster, smarter, and with " +
      "less bias. From voice and video interviews to real-time analysis, " +
      "we make hiring more efficient and insightful—so you can focus " +
      "on what really matters: finding the right fit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"dark"}>
      <body
        className={`${monaSans.className} antialiased pattern`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

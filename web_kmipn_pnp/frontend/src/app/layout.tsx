import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css"
import DefaultLayout from "@/components/DefaultLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Created by Pitok",
  description: "Generated by Created by Pitok",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="https://media.licdn.com/dms/image/v2/D4D03AQG7TgglFclaIw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730623577381?e=2147483647&v=beta&t=nc8TX7BlSQqDHoqMiREDbToogJ5UM0ANH_XkogtBEoY" type="image/x-icon" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <DefaultLayout>
          {children}
        </DefaultLayout>
      </body>
    </html>
  );
}
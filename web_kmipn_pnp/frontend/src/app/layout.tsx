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
  title: 'KMIPN - Kompetisi Mahasiswa Informatika Politeknik Nasional',
  description:
    'KMIPN adalah kompetisi tahunan bergengsi untuk mahasiswa informatika Politeknik Nasional. Tunjukkan kemampuan coding, inovasi, dan kreativitas lo di sini!',
  icons: 'https://media.licdn.com/dms/image/v2/D4D03AQG7TgglFclaIw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730623577381?e=2147483647&v=beta&t=nc8TX7BlSQqDHoqMiREDbToogJ5UM0ANH_XkogtBEoY',
  verification: {
    google: '7UVWLjtHfAA1ccchiarJNOFElAmh6e2a4nHTqbosAZU'
  },
  keywords: [
    'kmipn',
    'kmipn pnp',
    'kmipn 7',
    'kmipn vii',
    'kmipn politeknik negeri padang',
    'kompetisi mahasiswa',
    'informatika',
    'politeknik nasional',
    'coding',
    'inovasi',
    'teknologi',
    'kompetisi coding',
    'kompetisi IT'
  ],
  openGraph: {
    title: 'KMIPN - Kompetisi Mahasiswa Informatika Politeknik Nasional',
    description:
      'Buktikan kemampuan lo di KMIPN! Kompetisi bergengsi yang menguji kreativitas dan skill coding mahasiswa informatika Politeknik Nasional.',
    url: 'kmipnpnp-develop.vercel.app',
    siteName: 'KMIPN',
    images: ['https://media.licdn.com/dms/image/v2/D4D03AQG7TgglFclaIw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730623577381?e=2147483647&v=beta&t=nc8TX7BlSQqDHoqMiREDbToogJ5UM0ANH_XkogtBEoY'],
    locale: 'id_ID',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1
    }
  },
  authors: [
    {
      name: 'Pito Desri Pauzi',
      url: 'https://protofolio-ashy-one.vercel.app/'
    }
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GC8XNQ7T66"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GC8XNQ7T66');`
          }}></script>
      </head>
      <link rel="icon" href="https://media.licdn.com/dms/image/v2/D4D03AQG7TgglFclaIw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730623577381?e=2147483647&v=beta&t=nc8TX7BlSQqDHoqMiREDbToogJ5UM0ANH_XkogtBEoY" type="image/x-icon" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen `}
      >
        <DefaultLayout>
          {children}
        </DefaultLayout>
      </body>
    </html>
  );
}

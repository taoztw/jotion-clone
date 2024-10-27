import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Jotion",
  description: "Jotion",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        href: "/logo-dark.svg",
        url: "/logo-dark.svg",
      },
      {
        media: "(prefers-color-scheme: light)",
        href: "/logo.svg",
        url: "/logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        className={inter.className}
      >
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="jotion-clone"
          >
            <Toaster position="bottom-center" richColors />
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
import ScrollToTop from "./components/helper/scroll-to-top";
import { LanguageProvider } from "../contexts/LanguageContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import ErrorBoundary from "./components/helper/error-boundary";
import ScrollProgress from "./components/helper/scroll-progress";

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: "Portfolio of Oleksandr Hrybyniuk - Scientist",
  description:
    "This is the portfolio of Oleksandr Hrybyniuk. I am a scientific researcher.",
  keywords: "portfolio, scientist, researcher, Oleksandr Hrybyniuk",
  openGraph: {
    title: "Portfolio of Oleksandr Hrybyniuk - Scientist",
    description: "This is the portfolio of Oleksandr Hrybyniuk. I am a scientific researcher.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Ensure viewport and charset are properly set */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider>
            <LanguageProvider>
              <ScrollProgress />
              <ToastContainer />
              <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
                <Navbar />
                {children}
                <ScrollToTop />
              </main>
              <Footer />
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
        {process.env.NEXT_PUBLIC_GTM && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
        )}
      </body>
    </html>
  );
}

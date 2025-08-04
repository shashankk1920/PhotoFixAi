import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";
import { Toaster } from "../components/ui/sonner";
import { FloatingShapes } from "../components/floating-shapes";
import Header from "../components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { ConvexClientProvider } from "./ConvexClientProvider.jsx";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const metadata = {
  title: "PhotoFixAI",
  description: "Eidtor for your photos  - PhotoFixAI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          suppressHydrationWarning
        >

          <ClerkProvider 
            appearance={{baseTheme: shadesOfPurple}}
            signInUrl="/sign-in"
            signUpUrl="/sign-up"
            afterSignInUrl="/"
            afterSignUpUrl="/"
            signInFallbackRedirectUrl="/"
            signUpFallbackRedirectUrl="/"
          >
            <ConvexClientProvider>
            <Header/>
            <main className="bg-slate-900 min-h-screen text-white overflow-hidden">
              <FloatingShapes />
              <Toaster richColors />
              {children}
            </main>
            </ConvexClientProvider>
          </ClerkProvider>
          
        </ThemeProvider>
      </body>
    </html>
  );
}

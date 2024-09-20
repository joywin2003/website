import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Layout/Provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          {children}{" "}
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                error: "text-red-400 border-red-400",
                success: "text-green-400 border-green-400",
                warning: "text-yellow-400 border-yellow-400",
                info: "text-blue-400 border-blue-400",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}

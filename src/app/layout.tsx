import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TRPCProviders from "./_trpc/provider";
import MuiSetup from "@/components/MuiSetup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SecureShare - Share Secrets Safely",
  description:
    "A secure platform for sharing sensitive information with expiration and one-time access controls.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCProviders>
          <MuiSetup>{children}</MuiSetup>
        </TRPCProviders>
      </body>
    </html>
  );
}

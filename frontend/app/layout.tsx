import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../components/AuthContext";
import { CartProvider } from "../components/CartContext";
import Header from "../components/Headers";

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "Full stack e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
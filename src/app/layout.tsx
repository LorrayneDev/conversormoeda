import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CurrencyX - Conversor de Moedas Web",
  description: "Conversor de moedas moderno com taxas de câmbio em tempo real, design cyberpunk suave e micro-interações",
  keywords: ["currency", "converter", "exchange-rate", "nextjs", "typescript", "tailwindcss"],
  authors: [{ name: "CurrencyX" }],
  openGraph: {
    title: "CurrencyX - Conversor de Moedas",
    description: "Conversor de moedas moderno com taxas de câmbio em tempo real",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CurrencyX - Conversor de Moedas",
    description: "Conversor de moedas moderno com taxas de câmbio em tempo real",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

import { QueryProvider } from "@/shared/providers";
import { Toaster } from "@/shared/ui";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { PT_Mono, Open_Sans } from "next/font/google";
import "../globals.css";

const font = PT_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-pt",
});
const navFont = Open_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
});
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${font.variable} ${navFont.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

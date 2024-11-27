import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AIを活用した英語学習アプリのサンプル",
  description: "チャット、語彙の習得、スコアの競い合いができます。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={GeistSans.className} suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}

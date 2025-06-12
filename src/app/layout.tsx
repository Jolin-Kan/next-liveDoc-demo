import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "我的 Next.js 應用",
  description: "使用 Next.js App Router 建立的現代化網頁應用",
  keywords: ["Next.js", "React", "TypeScript"],
  authors: [{ name: "Your Name" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
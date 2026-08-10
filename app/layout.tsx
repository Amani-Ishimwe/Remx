import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-epilogue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Remx — The Retention Layer for Reading to Learn",
  description:
    "Paste technical articles, generate structured summaries, retention quizzes, and flashcards, and review on a spaced-repetition schedule.",
  keywords: [
    "spaced repetition",
    "reading retention",
    "technical learning",
    "flashcards",
    "study cohorts",
    "Kubernetes",
    "distributed systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={epilogue.variable}>
      <body className="min-h-screen bg-white text-remx-black selection:bg-remx-black selection:text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}

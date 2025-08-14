import "./globals.css";
import type { ReactNode } from "react";
import Nav from "@/components/navbar/Nav";

export const metadata = {
  title: "QuizFlow — AI Quiz Generator",
  description: "Generate quizzes from topics or PDFs using Gemini",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="container mx-auto px-4 py-8 flex-1">{children}</main>
          <footer className="bg-white border-t">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} QuizFlow — Built with Next.js & Gemini
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

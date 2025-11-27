import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "@/components/navbar/Nav";
import { Provider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QuizFlow — AI Quiz Generator",
  description: "Generate quizzes from topics or PDFs using Gemini",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} w-full bg-[#020617] text-white`}>
        <Provider>
          <Nav />

          <main className="min-h-screen">
            {children}
          </main>

          <footer className="border-t border-white/10 p-6 mt-10 text-sm flex items-center justify-between text-gray-400">
            <span>© 2025 Pariksha App</span>
            <span className="text-xs">Build with ❤️ by Codingo</span>
          </footer>
        </Provider>
      </body>
    </html>
  );
}

import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QuizFlow — AI Quiz Generator",
  description: "Generate quizzes from topics or PDFs using AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} w-full bg-[#020617] text-white`}>
        <Provider>
          <main className="min-h-screen">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

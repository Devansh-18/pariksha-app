"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Nav() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 md:px-12 py-4 bg-[#020617]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2"
      >
        <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-blue-500 flex items-center justify-center text-xs font-bold shadow-[0_0_25px_rgba(168,85,247,0.6)]">
          QF
        </div>
        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          QuizFlow
        </span>
      </motion.div>

      {/* Links */}
      <div className="hidden md:flex gap-10 text-sm font-medium text-gray-300">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <Link href="/quiz/new" className="hover:text-white transition-colors">
          Create Quiz
        </Link>
        <Link href="/dashboard" className="hover:text-white transition-colors">
          Dashboard
        </Link>
      </div>

      {/* Auth Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:brightness-110 shadow-lg shadow-purple-500/40 text-xs md:text-sm font-semibold"
      >
        {session ? "Go to Dashboard" : "Login"}
      </motion.button>
    </nav>
  );
}

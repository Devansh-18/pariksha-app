import Link from "next/link";

export default function Nav() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          QuizFlow
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/about" className="hover:text-indigo-600">
            About
          </Link>
          <Link href="/contact" className="hover:text-indigo-600">
            Contact
          </Link>
          <Link
            href="/quiz/new"
            className="ml-2 inline-block bg-indigo-600 text-white px-3 py-2 rounded-md text-sm"
          >
            Create Quiz
          </Link>
        </nav>
      </div>
    </header>
  );
}

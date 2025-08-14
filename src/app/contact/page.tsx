"use client";

export default function Contact() {
  return (
    <section className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Your name"
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Email"
        />
        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="Message"
          rows={5}
        />
        <div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Send (demo)
          </button>
        </div>
      </form>
    </section>
  );
}

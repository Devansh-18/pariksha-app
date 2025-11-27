"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type QuizFormState = {
  topic: string;
  totalMarks: number;
  includeSubjective: boolean;
  pdfUrl: string;
};

type ApiSuccessResponse = {
  success: true;
  message: string;
  data: {
    id: string;
  };
};

type ApiErrorResponse = {
  success?: false;
  error?: string;
  message?: string;
};

export default function QuizCreateForm() {
  const router = useRouter();

  const [form, setForm] = useState<QuizFormState>({
    topic: "",
    totalMarks: 30,
    includeSubjective: false,
    pdfUrl: "",
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange =
    (field: keyof QuizFormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value =
          field === "totalMarks"
            ? Number(e.target.value)
            : field === "includeSubjective"
              ? (e.target as HTMLInputElement).checked
              : e.target.value;

        setForm((prev) => ({
          ...prev,
          [field]: value,
        }));
      };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPdfFile(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    const hasTopic = form.topic.trim().length > 0;
    const hasPdfUrl = form.pdfUrl.trim().length > 0;
    const hasPdfFile = !!pdfFile;

    // Basic client-side validation consistent with your backend
    if (!hasTopic && !hasPdfFile && !hasPdfUrl) {
      setErrorMessage(
        "Please provide at least a topic, a PDF upload, or a PDF URL."
      );
      return;
    }

    if (form.totalMarks <= 0) {
      setErrorMessage("Total marks must be a positive number.");
      return;
    }

    try {
      setIsSubmitting(true);

      const fd = new FormData();
      fd.append("topic", form.topic.trim());
      fd.append("totalMarks", String(form.totalMarks));

      // Backend is doing: Boolean(formData.get("includeSubjective"))
      if (form.includeSubjective) {
        fd.append("includeSubjective", "true");
      }

      if (pdfFile) {
        fd.append("pdf", pdfFile);
      }

      if (hasPdfUrl) {
        fd.append("pdfUrl", form.pdfUrl.trim());
      }

      const res = await fetch("http://localhost:3000/api/quiz", {
        method: "POST",
        body: fd,
      });
      console.log("error");

      if (res.redirected) {
        router.push(res.url);
        return;
      }

      const data = (await res.json()) as ApiSuccessResponse | ApiErrorResponse;

      if (!res.ok) {
        const err = data as ApiErrorResponse;
        setErrorMessage(
          err.error ||
          err.message ||
          "Failed to create quiz. Please try again."
        );
        return;
      }


      const success = data as ApiSuccessResponse;
      setSuccessMessage(success.message || "Quiz created successfully!");

      // OPTIONAL: redirect to a quiz detail page after a short delay.
      // Adjust the path as per your app.
      // router.push(`/dashboard/quizzes/${success.data.id}`);
    } 
    catch (err) {
      console.error(err);
      setErrorMessage("Unexpected error. Please try again in a moment.");
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
        <div className="space-y-2">
          <label
            htmlFor="topic"
            className="text-sm font-medium text-neutral-200"
          >
            Topic (optional if PDF/PDF URL provided)
          </label>
          <input
            id="topic"
            name="topic"
            type="text"
            value={form.topic}
            onChange={handleChange("topic")}
            placeholder="e.g. Operating Systems – Deadlocks"
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-neutral-500"
          />
          <p className="text-xs text-neutral-500">
            AI will use this as context, along with PDF content if provided.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="totalMarks"
            className="text-sm font-medium text-neutral-200"
          >
            Total marks
          </label>
          <select
            id="totalMarks"
            name="totalMarks"
            value={form.totalMarks}
            onChange={handleChange("totalMarks")}
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value={30}>30 marks (1 hour)</option>
            <option value={60}>60 marks (2 hours)</option>
            <option value={90}>90 marks (3 hours)</option>
          </select>
          <p className="text-xs text-neutral-500">
            Backend maps this to total time automatically.
          </p>
        </div>
      </div>

      {/* Include subjective toggle */}
      <div className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-neutral-100">
            Include subjective questions
          </p>
          <p className="text-xs text-neutral-500">
            If enabled, the AI will mix in descriptive / long-answer questions.
          </p>
        </div>
        <label className="inline-flex items-center gap-2">
          <span className="text-xs text-neutral-400">Off</span>
          <button
            type="button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                includeSubjective: !prev.includeSubjective,
              }))
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full border ${form.includeSubjective
                ? "border-indigo-400 bg-indigo-500/80"
                : "border-neutral-600 bg-neutral-800"
              } transition-colors`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${form.includeSubjective ? "translate-x-5" : "translate-x-1"
                }`}
            />
          </button>
          <span className="text-xs text-neutral-400">On</span>
        </label>
      </div>

      {/* PDF upload */}
      <div className="space-y-2">
        <label
          htmlFor="pdf"
          className="text-sm font-medium text-neutral-200"
        >
          Upload PDF (optional)
        </label>
        <div className="flex flex-col gap-2 rounded-lg border border-dashed border-neutral-700 bg-neutral-950/50 p-3">
          <input
            id="pdf"
            name="pdf"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full text-xs text-neutral-300 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-500/90 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-indigo-400"
          />
          <p className="text-xs text-neutral-500">
            Attach lecture slides, notes, or any PDF. Text will be extracted on
            the server.
          </p>
          {pdfFile && (
            <p className="text-xs text-emerald-400">
              Selected: <span className="font-medium">{pdfFile.name}</span>
            </p>
          )}
        </div>
      </div>

      {/* PDF URL */}
      <div className="space-y-2">
        <label
          htmlFor="pdfUrl"
          className="text-sm font-medium text-neutral-200"
        >
          PDF URL (Optional: If you included PDF file than it has no role.)
        </label>
        <input
          id="pdfUrl"
          name="pdfUrl"
          type="url"
          value={form.pdfUrl}
          onChange={handleChange("pdfUrl")}
          placeholder="https://example.com/notes.pdf"
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-neutral-500"
        />
        <p className="text-xs text-neutral-500">
          If provided, the backend will fetch and parse this PDF directly.
        </p>
      </div>

      {/* Error & success messages */}
      {errorMessage && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
          {successMessage}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-neutral-500">
          The quiz will be generated using AI.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && (
            <span className="h-3 w-3 animate-spin rounded-full border border-transparent border-t-white" />
          )}
          <span>{isSubmitting ? "Creating quiz..." : "Create quiz with AI"}</span>
        </button>
      </div>
    </form>
  );
}
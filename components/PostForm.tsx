"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getColleges } from "@/lib/api";
import { ApiError } from "@/lib/api";
import { College, CreatePostInput, PostType } from "@/types";

interface PostFormProps {
  initialValues?: CreatePostInput;
  onSubmit: (values: CreatePostInput) => Promise<void>;
  submitLabel: string;
}

const emptyValues: CreatePostInput = {
  title: "",
  description: "",
  type: "Lost",
  collegeId: 0,
  contactNumber: "",
};

export default function PostForm({
  initialValues,
  onSubmit,
  submitLabel,
}: PostFormProps) {
  const router = useRouter();
  const [colleges, setColleges] = useState<College[]>([]);
  const [values, setValues] = useState<CreatePostInput>(
    initialValues ?? emptyValues
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getColleges().then(setColleges).catch(() => setError("Failed to load colleges."));
  }, []);

  function update<K extends keyof CreatePostInput>(key: K, value: CreatePostInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (values.collegeId === 0) {
      setError("Please select a college.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <div className="flex gap-3">
          {(["Lost", "Found"] as PostType[]).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => update("type", t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                values.type === t
                  ? t === "Lost"
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          required
          maxLength={100}
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="e.g., Black wallet with student ID"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          required
          maxLength={1000}
          rows={4}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Describe where and when, and any identifying details..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">College</label>
        <select
          required
          value={values.collegeId}
          onChange={(e) => update("collegeId", Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value={0} disabled>
            Select a college
          </option>
          {colleges.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Contact Number</label>
        <input
          required
          value={values.contactNumber}
          onChange={(e) => update("contactNumber", e.target.value)}
          placeholder="05XXXXXXXX"
          pattern="^05\d{8}$"
          title="Enter a valid Saudi mobile number (e.g., 0512345678)"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2 rounded-lg text-sm font-medium border border-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
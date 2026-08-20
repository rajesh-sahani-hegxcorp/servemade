"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { isLikelyEmail } from "@/lib/utils";

interface Props {
  /** Tags the lead with where it came from, e.g. "quote-page" or "samples-page". */
  source: string;
  heading: string;
  submitLabel: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export function QuoteForm({ source, heading, submitLabel }: Props) {
  const { items, removeItem, clear } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");

    if (!isLikelyEmail(email)) {
      setStatus("error");
      setErrorMessage("Enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email,
          company: form.get("company"),
          phone: form.get("phone"),
          country: form.get("country"),
          message: form.get("message"),
          source,
          items: items.map((item) => ({ label: item.label })),
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      clear();
      event.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-line bg-brand-green-light p-8 text-center">
        <h3 className="text-xl font-extrabold text-brand-green-dark">Request received.</h3>
        <p className="mt-2 text-sm text-ink-2">
          Thanks — {heading.toLowerCase()}. Our team replies with pricing within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-8">
      {items.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink-3">In your quote list</h3>
          <ul className="flex flex-wrap gap-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-1.5 rounded-full bg-brand-green-light px-3 py-1.5 text-sm font-semibold text-brand-green-dark"
              >
                {item.label}
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.label}`}
                  className="grid h-4 w-4 place-items-center rounded-full hover:bg-brand-green/20"
                >
                  <X size={11} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Work email" name="email" type="email" required />
        <Field label="Company" name="company" />
        <Field label="Phone (with country code)" name="phone" />
        <Field label="Country" name="country" />
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-bold text-ink">
          What do you need?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Products, estimated monthly volume, target price point…"
          className="w-full rounded-2xl border-2 border-line px-4 py-3 text-sm font-medium outline-none focus:border-brand-green"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm font-semibold text-red-600">
          {errorMessage}
        </p>
      )}

      <div className="mt-6">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-bold text-ink">
        {label}
        {required && <span className="text-brand-green"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl border-2 border-line px-4 py-3 text-sm font-medium outline-none focus:border-brand-green"
      />
    </div>
  );
}

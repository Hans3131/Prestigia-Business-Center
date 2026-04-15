"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  Field,
  Input,
  Select,
  Textarea,
  Button,
  useToast,
} from "@/components/ui";

export function ContactForm() {
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone") ?? "",
      subject: fd.get("subject"),
      message: fd.get("message"),
      consent: fd.get("consent") === "on" ? "on" : "",
      website: fd.get("website") ?? "",
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Envoi impossible");
      }
      toast.success(
        "Message envoyé",
        "Un conseiller vous répond sous 24h ouvrées."
      );
      form.reset();
    } catch (err) {
      toast.error(
        "Envoi impossible",
        err instanceof Error ? err.message : "Réessayez plus tard."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-6" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Nom complet *">
          <Input name="name" required autoComplete="name" />
        </Field>
        <Field label="Email *">
          <Input name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Téléphone">
          <Input name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field label="Sujet *">
          <Select name="subject" defaultValue="" required>
            <option value="" disabled>
              Sélectionner
            </option>
            <option value="info">Demande d'information</option>
            <option value="quote">Devis sur-mesure</option>
            <option value="visit">Réservation de visite</option>
            <option value="partnership">Partenariat</option>
            <option value="other">Autre</option>
          </Select>
        </Field>
      </div>
      <Field label="Message *">
        <Textarea
          name="message"
          rows={5}
          required
          placeholder="Votre demande en quelques lignes…"
        />
      </Field>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-start gap-3 text-sm text-navy/75">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 accent-[#C9A84C]"
          />
          <span>J'accepte la politique de confidentialité.</span>
        </label>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2
                size={16}
                strokeWidth={1.5}
                className="animate-spin"
              />
              Envoi…
            </>
          ) : (
            <>
              Envoyer
              <ArrowRight size={16} strokeWidth={1.5} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

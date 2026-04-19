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
import { submitForm, buildMessageBody } from "@/lib/submit";

const SUBJECT_LABELS: Record<string, string> = {
  info: "Demande d'information",
  quote: "Devis sur-mesure",
  visit: "Réservation de visite",
  partnership: "Partenariat",
  other: "Autre",
};

export function ContactForm() {
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const subject = String(fd.get("subject") ?? "");
    const message = String(fd.get("message") ?? "").trim();
    const consent = fd.get("consent") === "on";
    const botTrap = String(fd.get("website") ?? "");

    if (!name || name.length < 2) {
      toast.error("Nom requis");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Email invalide");
      return;
    }
    if (!subject) {
      toast.error("Sélectionnez un sujet");
      return;
    }
    if (!message || message.length < 10) {
      toast.error("Message trop court");
      return;
    }
    if (!consent) {
      toast.error("Consentement requis");
      return;
    }

    const subjectLabel = SUBJECT_LABELS[subject] ?? subject;

    setSubmitting(true);
    try {
      await submitForm({
        subject: `[Prestigia] ${subjectLabel} — ${name}`,
        message: buildMessageBody("Nouvelle demande de contact", [
          ["Nom", name],
          ["Email", email],
          ["Téléphone", phone || "—"],
          ["Sujet", subjectLabel],
          ["Message", message],
        ]),
        replyTo: email,
        botTrap,
      });
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

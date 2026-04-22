"use client";

import { useRef, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  Field,
  Input,
  Select,
  Textarea,
  Button,
  useToast,
  ReCaptcha,
  type ReCaptchaHandle,
} from "@/components/ui";
import { submitForm, buildMessageBody } from "@/lib/submit";

const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "4e2b08e0-10d3-466a-85cc-2625815934ee";

const FROM_NAME =
  process.env.NEXT_PUBLIC_CONTACT_FROM_NAME || "Prestigia Business Center";

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
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<ReCaptchaHandle>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const subjectKey = String(fd.get("subject_key") ?? "");
    const body = String(fd.get("body") ?? "").trim();
    const consent = fd.get("consent") === "on";
    const botTrap = String(fd.get("website") ?? "");

    // Inline validation
    if (!name || name.length < 2) return toast.error("Nom requis");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Email invalide");
    if (!subjectKey) return toast.error("Sélectionnez un sujet");
    if (!body || body.length < 10) return toast.error("Message trop court");
    if (!consent) return toast.error("Consentement requis");

    const captchaToken = captchaRef.current?.getToken() || "";
    if (!captchaToken)
      return toast.error("Veuillez valider le reCAPTCHA");

    const subjectLabel = SUBJECT_LABELS[subjectKey] ?? subjectKey;

    // Fill Web3Forms required hidden fields
    if (subjectRef.current)
      subjectRef.current.value = `[Prestigia] ${subjectLabel} — ${name}`;
    if (messageRef.current)
      messageRef.current.value = buildMessageBody(
        "Nouvelle demande de contact",
        [
          ["Nom", name],
          ["Email", email],
          ["Téléphone", phone || "—"],
          ["Sujet", subjectLabel],
          ["Message", body],
        ]
      );

    setSubmitting(true);
    try {
      await submitForm({ form, botTrap });
      toast.success(
        "Message envoyé",
        "Un conseiller vous répond sous 24h ouvrées."
      );
      form.reset();
      captchaRef.current?.reset();
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
      {/* Web3Forms required hidden fields */}
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="from_name" value={FROM_NAME} />
      <input type="hidden" name="subject" ref={subjectRef} />
      <input type="hidden" name="message" ref={messageRef} />

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
          <Select name="subject_key" defaultValue="" required>
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
          name="body"
          rows={5}
          required
          placeholder="Votre demande en quelques lignes…"
        />
      </Field>

      <div className="flex flex-col gap-5">
        <label className="flex items-start gap-3 text-sm text-navy/75">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 accent-[#C9A84C]"
          />
          <span>J'accepte la politique de confidentialité.</span>
        </label>

        <ReCaptcha ref={captchaRef} />

        <div className="flex justify-end pt-2">
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
      </div>
    </form>
  );
}

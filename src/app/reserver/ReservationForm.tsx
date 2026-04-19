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
} from "@/components/ui";
import { submitForm, buildMessageBody } from "@/lib/submit";

const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "4e2b08e0-10d3-466a-85cc-2625815934ee";

const FROM_NAME =
  process.env.NEXT_PUBLIC_CONTACT_FROM_NAME || "Prestigia Business Center";

const SERVICE_LABELS: Record<string, string> = {
  domiciliation: "Domiciliation",
  gestion: "Gestion administrative",
  salles: "Salles de réunion",
  coworking: "Coworking",
  marketing: "Accompagnement marketing",
  all: "Découverte générale",
};

const SLOT_LABELS: Record<string, string> = {
  morning: "Matinée (08h – 12h)",
  afternoon: "Après-midi (13h – 17h)",
  evening: "Fin de journée (17h – 20h)",
};

export function ReservationForm() {
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const fd = new FormData(form);

    const firstname = String(fd.get("firstname") ?? "").trim();
    const lastname = String(fd.get("lastname") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const serviceKey = String(fd.get("service_key") ?? "");
    const date = String(fd.get("date") ?? "");
    const slot = String(fd.get("slot_key") ?? "");
    const body = String(fd.get("body") ?? "").trim();
    const consent = fd.get("consent") === "on";
    const botTrap = String(fd.get("website") ?? "");

    if (!firstname || !lastname) return toast.error("Nom et prénom requis");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Email invalide");
    if (!serviceKey) return toast.error("Sélectionnez un service");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
      return toast.error("Date invalide");
    if (!consent) return toast.error("Consentement requis");

    const serviceLabel = SERVICE_LABELS[serviceKey] ?? serviceKey;
    const slotLabel = slot ? SLOT_LABELS[slot] ?? slot : "Peu importe";

    if (subjectRef.current)
      subjectRef.current.value = `[Prestigia] Réservation — ${firstname} ${lastname} (${serviceLabel})`;
    if (messageRef.current)
      messageRef.current.value = buildMessageBody(
        "Nouvelle demande de réservation",
        [
          ["Nom complet", `${firstname} ${lastname}`],
          ["Email", email],
          ["Téléphone", phone || "—"],
          ["Entreprise", company || "—"],
          ["Service", serviceLabel],
          ["Date souhaitée", date],
          ["Créneau", slotLabel],
          ["Message", body || "—"],
        ]
      );

    setSubmitting(true);
    try {
      await submitForm({ form, botTrap });
      toast.success(
        "Demande envoyée",
        "Nous revenons vers vous sous 24h ouvrées."
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
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-sm border border-navy/10 bg-cream/60 p-8 md:p-10"
    >
      <h3 className="font-serif text-2xl font-semibold leading-tight text-navy">
        Demande de rendez-vous
      </h3>
      <p className="mt-2 text-sm text-navy/70">
        Tous les champs marqués d'une étoile sont requis.
      </p>

      {/* Web3Forms hidden fields */}
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

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Prénom *">
          <Input name="firstname" required autoComplete="given-name" />
        </Field>
        <Field label="Nom *">
          <Input name="lastname" required autoComplete="family-name" />
        </Field>
        <Field label="Email *">
          <Input name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Téléphone">
          <Input name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field label="Entreprise">
          <Input name="company" autoComplete="organization" />
        </Field>
        <Field label="Service d'intérêt *">
          <Select name="service_key" defaultValue="" required>
            <option value="" disabled>
              Sélectionner
            </option>
            <option value="domiciliation">Domiciliation</option>
            <option value="gestion">Gestion administrative</option>
            <option value="salles">Salles de réunion</option>
            <option value="coworking">Coworking</option>
            <option value="marketing">Accompagnement marketing</option>
            <option value="all">Je découvre</option>
          </Select>
        </Field>
        <Field label="Date souhaitée *">
          <Input name="date" type="date" required />
        </Field>
        <Field label="Créneau">
          <Select name="slot_key" defaultValue="">
            <option value="">Peu importe</option>
            <option value="morning">Matinée (08h – 12h)</option>
            <option value="afternoon">Après-midi (13h – 17h)</option>
            <option value="evening">Fin de journée (17h – 20h)</option>
          </Select>
        </Field>
        <Field label="Message" className="md:col-span-2">
          <Textarea
            name="body"
            rows={4}
            placeholder="Quelques mots sur votre projet (facultatif)"
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-start gap-3 text-sm text-navy/75">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 accent-[#C9A84C]"
          />
          <span>J'accepte d'être recontacté par Prestigia.</span>
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
              Envoyer ma demande
              <ArrowRight size={16} strokeWidth={1.5} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

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
    const service = String(fd.get("service") ?? "");
    const date = String(fd.get("date") ?? "");
    const slot = String(fd.get("slot") ?? "");
    const message = String(fd.get("message") ?? "").trim();
    const consent = fd.get("consent") === "on";
    const botTrap = String(fd.get("website") ?? "");

    if (!firstname || !lastname) {
      toast.error("Nom et prénom requis");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Email invalide");
      return;
    }
    if (!service) {
      toast.error("Sélectionnez un service");
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      toast.error("Date invalide");
      return;
    }
    if (!consent) {
      toast.error("Consentement requis");
      return;
    }

    const serviceLabel = SERVICE_LABELS[service] ?? service;
    const slotLabel = slot ? SLOT_LABELS[slot] ?? slot : "Peu importe";

    setSubmitting(true);
    try {
      await submitForm({
        subject: `[Prestigia] Réservation — ${firstname} ${lastname} (${serviceLabel})`,
        message: buildMessageBody("Nouvelle demande de réservation", [
          ["Nom complet", `${firstname} ${lastname}`],
          ["Email", email],
          ["Téléphone", phone || "—"],
          ["Entreprise", company || "—"],
          ["Service", serviceLabel],
          ["Date souhaitée", date],
          ["Créneau", slotLabel],
          ["Message", message || "—"],
        ]),
        replyTo: email,
        botTrap,
      });
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
          <Select name="service" defaultValue="" required>
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
          <Select name="slot" defaultValue="">
            <option value="">Peu importe</option>
            <option value="morning">Matinée (08h – 12h)</option>
            <option value="afternoon">Après-midi (13h – 17h)</option>
            <option value="evening">Fin de journée (17h – 20h)</option>
          </Select>
        </Field>
        <Field label="Message" className="md:col-span-2">
          <Textarea
            name="message"
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

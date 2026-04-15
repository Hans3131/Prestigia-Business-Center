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

export function ReservationForm() {
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      firstname: fd.get("firstname"),
      lastname: fd.get("lastname"),
      email: fd.get("email"),
      phone: fd.get("phone") ?? "",
      company: fd.get("company") ?? "",
      service: fd.get("service"),
      date: fd.get("date"),
      slot: fd.get("slot") ?? "",
      message: fd.get("message") ?? "",
      consent: fd.get("consent") === "on" ? "on" : "",
      website: fd.get("website") ?? "",
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({} as { error?: string }));
      if (res.status === 429) {
        throw new Error(
          data?.error ||
            "Trop de tentatives. Réessayez dans quelques minutes."
        );
      }
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Envoi impossible");
      }
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

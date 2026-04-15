import { NextResponse } from "next/server";
import { reservationSchema, labels } from "@/lib/schemas";
import { brandedHtml, brandedText, sendMail } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const rl = rateLimit(`reservation:${ip}`, {
      limit: 5,
      windowMs: 10 * 60_000,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Trop de tentatives, réessayez dans quelques minutes." },
        {
          status: 429,
          headers: { "Retry-After": String(rl.retryAfterSec) },
        }
      );
    }

    const lenHeader = request.headers.get("content-length");
    if (lenHeader && Number(lenHeader) > 16_000) {
      return NextResponse.json(
        { ok: false, error: "Requête trop volumineuse." },
        { status: 413 }
      );
    }

    const body = await request.json();
    const parsed = reservationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Champs invalides" },
        { status: 400 }
      );
    }

    // Silent honeypot
    if (parsed.data.website && parsed.data.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const d = parsed.data;
    const serviceLabel = labels.service[d.service] ?? d.service;
    const slotLabel = d.slot ? labels.slot[d.slot] ?? d.slot : "Peu importe";

    const rows: [string, string][] = [
      ["Nom complet", `${d.firstname} ${d.lastname}`],
      ["Email", d.email],
      ["Téléphone", d.phone || "—"],
      ["Entreprise", d.company || "—"],
      ["Service", serviceLabel],
      ["Date souhaitée", d.date],
      ["Créneau", slotLabel],
      ["Message", d.message || "—"],
    ];

    const result = await sendMail({
      subject: `[Prestigia] Réservation — ${d.firstname} ${d.lastname} (${serviceLabel})`,
      html: brandedHtml("Nouvelle demande de réservation", rows),
      text: brandedText("Nouvelle demande de réservation", rows),
      replyTo: d.email,
    });

    return NextResponse.json({ ok: true, delivered: result.delivered });
  } catch (err) {
    console.error("[/api/reservation]", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur, réessayez plus tard." },
      { status: 500 }
    );
  }
}

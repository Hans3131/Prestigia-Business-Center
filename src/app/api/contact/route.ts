import { NextResponse } from "next/server";
import { contactSchema, labels } from "@/lib/schemas";
import { brandedHtml, brandedText, sendMail } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    // Rate limit — 5 requests / 10 minutes per IP
    const ip = clientIp(request);
    const rl = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60_000 });
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Trop de tentatives, réessayez dans quelques minutes." },
        {
          status: 429,
          headers: { "Retry-After": String(rl.retryAfterSec) },
        }
      );
    }

    // Abort oversized requests
    const lenHeader = request.headers.get("content-length");
    if (lenHeader && Number(lenHeader) > 16_000) {
      return NextResponse.json(
        { ok: false, error: "Requête trop volumineuse." },
        { status: 413 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Champs invalides" },
        { status: 400 }
      );
    }

    // Silent honeypot — act as if everything went fine so bots don't retry.
    if (parsed.data.website && parsed.data.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const d = parsed.data;
    const subjectLabel = labels.subject[d.subject] ?? d.subject;

    const rows: [string, string][] = [
      ["Nom", d.name],
      ["Email", d.email],
      ["Téléphone", d.phone || "—"],
      ["Sujet", subjectLabel],
      ["Message", d.message],
    ];

    const result = await sendMail({
      subject: `[Prestigia] ${subjectLabel} — ${d.name}`,
      html: brandedHtml("Nouvelle demande de contact", rows),
      text: brandedText("Nouvelle demande de contact", rows),
      replyTo: d.email,
    });

    return NextResponse.json({ ok: true, delivered: result.delivered });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur, réessayez plus tard." },
      { status: 500 }
    );
  }
}

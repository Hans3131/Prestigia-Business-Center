import { NextResponse } from "next/server";
import { contactSchema, labels } from "@/lib/schemas";
import { brandedHtml, brandedText, sendMail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Champs invalides",
          issues: parsed.error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    // Honeypot catch → return success silently so bots don't retry
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

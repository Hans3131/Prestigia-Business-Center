/**
 * Client-side submission to Web3Forms.
 * The access key is public (only allows sending to the email configured with
 * Web3Forms — rotatable at any time). Bots are kept out by the honeypot field.
 */

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
const FROM_NAME =
  process.env.NEXT_PUBLIC_CONTACT_FROM_NAME || "Prestigia Business Center";

type SubmitArgs = {
  subject: string;
  message: string;
  /** Prospect's email — used as Reply-To */
  replyTo?: string;
  /** Honeypot value — if truthy, bail silently */
  botTrap?: string;
};

export async function submitForm({
  subject,
  message,
  replyTo,
  botTrap,
}: SubmitArgs) {
  // Silent honeypot — pretend success
  if (botTrap && botTrap.length > 0) {
    return { delivered: false as const, honeypot: true as const };
  }

  if (!ACCESS_KEY) {
    throw new Error(
      "Configuration manquante. Contactez-nous directement par email."
    );
  }

  const payload: Record<string, unknown> = {
    access_key: ACCESS_KEY,
    subject,
    message,
    from_name: FROM_NAME,
  };
  if (replyTo) payload.email = replyTo;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };

  if (!res.ok || !data.success) {
    throw new Error(
      data.message || "Envoi impossible. Réessayez dans un instant."
    );
  }

  return { delivered: true as const };
}

/** Build the rich text body for the email notification */
export function buildMessageBody(title: string, rows: [string, string][]) {
  return (
    title +
    "\n\n" +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    "\n\n—\nNotification automatique Prestigia"
  );
}

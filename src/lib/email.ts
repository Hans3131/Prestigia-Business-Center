const ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;
const FROM_NAME = process.env.CONTACT_FROM_NAME || "Prestigia Business Center";

type SendArgs = {
  /** Subject line of the email */
  subject: string;
  /** Plain text body */
  text: string;
  /** HTML body (optional) */
  html?: string;
  /** Sender name displayed in the inbox */
  fromName?: string;
  /** Email address to set as Reply-To (usually the prospect's email) */
  replyTo?: string;
};

/**
 * Send a form submission via Web3Forms.
 *
 * Web3Forms doesn't require sender domain verification — it uses their own
 * verified sending infrastructure, and the configured access key determines
 * the destination. No API key is needed to verify with a domain.
 *
 * When WEB3FORMS_ACCESS_KEY is not configured (local dev), the payload is
 * logged to the console and treated as a success.
 */
export async function sendMail({
  subject,
  text,
  html,
  fromName,
  replyTo,
}: SendArgs) {
  if (!ACCESS_KEY) {
    console.log("───────── [DEV] email ─────────");
    console.log("REPLY-TO:", replyTo ?? "(none)");
    console.log("SUBJECT :", subject);
    console.log("TEXT    :\n" + text);
    console.log("───────────────────────────────");
    return { delivered: false, dev: true as const };
  }

  const payload: Record<string, unknown> = {
    access_key: ACCESS_KEY,
    subject,
    message: text,
    from_name: fromName || FROM_NAME,
  };

  if (html) payload.html = html;
  if (replyTo) payload.replyto = replyTo;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const rawText = await res.text();
  let data: { success?: boolean; message?: string } = {};
  try {
    data = JSON.parse(rawText);
  } catch {
    /* non-JSON response */
  }

  if (!res.ok || !data.success) {
    console.error("[web3forms] failed:", res.status, rawText);
    throw new Error(
      `web3forms ${res.status}: ${data.message || rawText.slice(0, 200) || "no body"}`
    );
  }

  return { delivered: true as const };
}

/** Tiny HTML escape for values coming from the form */
export function esc(s: string | undefined | null) {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function brandedHtml(title: string, rows: [string, string][]) {
  const items = rows
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #ECE7D9;color:#8A8578;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;font-family:Inter,Arial,sans-serif;width:40%;vertical-align:top">${esc(
            k
          )}</td>
          <td style="padding:10px 0;border-bottom:1px solid #ECE7D9;color:#0B1A2E;font-size:15px;font-family:Inter,Arial,sans-serif;line-height:1.55;white-space:pre-line">${esc(
            v
          )}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
  <html lang="fr"><body style="margin:0;padding:0;background:#F5F0E4;font-family:Inter,Arial,sans-serif;color:#0B1A2E">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E4;padding:32px 16px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FAF7F0;border:1px solid #E5DEC8;border-radius:4px">
          <tr><td style="padding:28px 28px 0">
            <div style="font-family:'Playfair Display',Georgia,serif;font-weight:600;font-size:22px;letter-spacing:-0.01em">Prestigia</div>
            <div style="margin-top:4px;color:#C9A84C;font-size:10px;letter-spacing:0.3em;text-transform:uppercase">Business Center · Zaventem</div>
          </td></tr>
          <tr><td style="padding:24px 28px 8px">
            <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;font-weight:600;font-size:22px;line-height:1.25;color:#0B1A2E">${esc(
              title
            )}</h1>
          </td></tr>
          <tr><td style="padding:8px 28px 28px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${items}</table>
          </td></tr>
          <tr><td style="padding:0 28px 28px;border-top:1px solid #ECE7D9;text-align:center;color:#8A8578;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;padding-top:20px">
            Notification automatique Prestigia
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

export function brandedText(title: string, rows: [string, string][]) {
  return (
    title +
    "\n\n" +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    "\n\n—\nNotification automatique Prestigia"
  );
}

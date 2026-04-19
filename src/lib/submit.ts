/**
 * Client-side submission to Web3Forms using FormData (not JSON).
 * Web3Forms detects JSON payloads as server-side and rejects them on the free
 * tier — multipart/form-data from a <form> element is the officially supported
 * "client-side" method.
 */

type SubmitArgs = {
  /** Form element whose fields will be submitted. Must contain the
   * `access_key` hidden input. */
  form: HTMLFormElement;
  /** Honeypot value — if truthy, bail silently */
  botTrap?: string;
};

export async function submitForm({ form, botTrap }: SubmitArgs) {
  // Silent honeypot — pretend success
  if (botTrap && botTrap.length > 0) {
    return { delivered: false as const, honeypot: true as const };
  }

  const fd = new FormData(form);

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: fd,
    headers: { Accept: "application/json" },
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

/** Build a text summary of form fields for the email body */
export function buildMessageBody(title: string, rows: [string, string][]) {
  return (
    title +
    "\n\n" +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    "\n\n—\nNotification automatique Prestigia"
  );
}

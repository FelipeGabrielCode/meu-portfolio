import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function isValidEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request): Promise<Response> {
  let payload: ContactPayload;

  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({}, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  // Validação simples; o client já valida também.
  if (name.length < 2 || !isValidEmail(email) || message.length < 5) {
    return NextResponse.json({}, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? "felipegabriel.code@gmail.com";

  if (!apiKey || !from) {
    console.error("[/api/contact] Missing env vars. Need RESEND_API_KEY and RESEND_FROM_EMAIL.");
    return NextResponse.json({}, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);

    const subject = `Contato via site - ${name}`;
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedMessage = escapeHtml(message);

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.4;">
        <p style="margin: 0 0 12px;">
          <strong>Nova mensagem de contato</strong>
        </p>
        <p style="margin: 0 0 8px;">
          <strong>Nome:</strong> ${escapedName}
        </p>
        <p style="margin: 0 0 16px;">
          <strong>Email:</strong> <a href="mailto:${escapedEmail}">${escapedEmail}</a>
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
        <p style="white-space: pre-wrap; margin: 12px 0 0;">
          ${escapedMessage}
        </p>
      </div>
    `;

    const text = `Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}\n`;

    await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
    });

    // Não enviamos "message" para não sobrescrever a tradução do client.
    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.error("[/api/contact] Resend send failed:", err);
    return NextResponse.json({}, { status: 500 });
  }
}


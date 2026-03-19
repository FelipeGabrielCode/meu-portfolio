type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function isValidEmail(email: string) {
  // Simple but effective validation for dev use
  return /^\S+@\S+\.\S+$/.test(email);
}

function getValidationError(payload: ContactPayload): string | null {
  const { name, email, message } = payload;

  if (typeof name !== "string" || name.trim().length < 2) {
    return "Nome inválido.";
  }

  if (typeof email !== "string" || !isValidEmail(email.trim())) {
    return "Email inválido.";
  }

  if (typeof message !== "string" || message.trim().length < 5) {
    return "Mensagem muito curta.";
  }

  return null;
}

// Next.js-like handler signature (but implemented without `next/server`).
export async function POST(req: Request): Promise<Response> {
  let payload: ContactPayload;

  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return new Response(JSON.stringify({ message: "Payload inválido. Envie JSON." }), {
      status: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  const validationError = getValidationError(payload);
  if (validationError) {
    return new Response(JSON.stringify({ message: validationError }), {
      status: 400,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  const data = {
    name: (payload.name as string).trim(),
    email: (payload.email as string).trim(),
    message: (payload.message as string).trim(),
  };

  // Simulate sending email in development
  console.log("[/api/contact] Simulated email send:", data);

  return new Response(
    JSON.stringify({
      message: "Mensagem simulada com sucesso! Em produção, isso enviaria um e-mail.",
    }),
    {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
    },
  );
}


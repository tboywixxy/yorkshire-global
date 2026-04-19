import type { ContactApiErrorCode } from "@/src/lib/contact/api";

type TurnstileSiteverifyResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  cdata?: string;
  challenge_ts?: string;
  "error-codes"?: string[];
};

export type TurnstileVerificationResult =
  | {
      ok: true;
      hostname: string;
      action?: string;
      challengeTs?: string;
      errorCodes: string[];
    }
  | {
      ok: false;
      code: ContactApiErrorCode;
      message: string;
      hostname?: string;
      errorCodes: string[];
    };

function parseAllowedHostnames() {
  return String(process.env.TURNSTILE_ALLOWED_HOSTNAMES || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export async function verifyTurnstileToken(params: {
  token: string;
  remoteIp?: string;
}): Promise<TurnstileVerificationResult> {
  const token = params.token.trim();
  if (!token) {
    return {
      ok: false,
      code: "TURNSTILE_REQUIRED",
      message: "Please complete the security check before submitting.",
      errorCodes: [],
    };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return {
      ok: false,
      code: "CONFIGURATION_ERROR",
      message: "Security verification is not configured correctly.",
      errorCodes: [],
    };
  }

  const allowedHostnames = parseAllowedHostnames();
  if (allowedHostnames.length === 0) {
    return {
      ok: false,
      code: "CONFIGURATION_ERROR",
      message: "Security verification hostnames are not configured.",
      errorCodes: [],
    };
  }

  const formData = new URLSearchParams();
  formData.append("secret", secret);
  formData.append("response", token);

  if (params.remoteIp) {
    formData.append("remoteip", params.remoteIp);
  }

  let verifyRes: Response;
  try {
    verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
  } catch {
    return {
      ok: false,
      code: "TURNSTILE_VERIFICATION_ERROR",
      message: "Security verification could not be completed.",
      errorCodes: [],
    };
  }

  let verify: TurnstileSiteverifyResponse | null = null;
  try {
    verify = (await verifyRes.json()) as TurnstileSiteverifyResponse;
  } catch {
    verify = null;
  }

  if (!verifyRes.ok || !verify) {
    return {
      ok: false,
      code: "TURNSTILE_VERIFICATION_ERROR",
      message: "Security verification could not be completed.",
      errorCodes: [],
    };
  }

  const hostname = verify.hostname?.trim().toLowerCase();
  const errorCodes = Array.isArray(verify["error-codes"]) ? verify["error-codes"] : [];

  if (!verify.success) {
    return {
      ok: false,
      code: "TURNSTILE_INVALID",
      message: "Security check failed. Please retry the verification.",
      hostname,
      errorCodes,
    };
  }

  if (!hostname) {
    return {
      ok: false,
      code: "TURNSTILE_INVALID",
      message: "Security check did not return a valid hostname.",
      errorCodes,
    };
  }

  if (!allowedHostnames.includes(hostname)) {
    return {
      ok: false,
      code: "TURNSTILE_HOSTNAME_MISMATCH",
      message: "Security check hostname did not match this site.",
      hostname,
      errorCodes,
    };
  }

  return {
    ok: true,
    hostname,
    action: verify.action,
    challengeTs: verify.challenge_ts,
    errorCodes,
  };
}

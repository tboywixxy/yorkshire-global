type LogLevel = "info" | "warn" | "error";

function sanitizeValue(value: unknown): unknown {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
    };
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, nested]) => [
        key,
        sanitizeValue(nested),
      ])
    );
  }

  return value;
}

export function maskEmail(email: string) {
  const trimmed = email.trim().toLowerCase();
  const [localPart = "", domain = ""] = trimmed.split("@");

  if (!localPart || !domain) return "";

  const visibleLocal = localPart.slice(0, 2);
  return `${visibleLocal}${"*".repeat(Math.max(1, localPart.length - 2))}@${domain}`;
}

export function logContactEvent(level: LogLevel, event: string, data: Record<string, unknown>) {
  const sanitizedData = sanitizeValue(data) as Record<string, unknown>;
  const payload = {
    scope: "contact-form",
    event,
    timestamp: new Date().toISOString(),
    ...sanitizedData,
  };

  const serialized = JSON.stringify(payload);

  if (level === "error") {
    console.error(serialized);
    return;
  }

  if (level === "warn") {
    console.warn(serialized);
    return;
  }

  console.info(serialized);
}

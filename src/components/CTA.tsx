import Link from "next/link";
import Image from "next/image";
import Container from "@/src/components/Container";

export default function CTA({
  title,
  subtitle,
  buttonText = "Contact Us",
  buttonHref = "/contact",
}: {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonHref?: string;
}) {
  return (
    <section className="py-12 sm:py-14 pb-6 sm:pb-8"> 
      <Container>
        <div
          className="relative overflow-hidden rounded-3xl border p-6 shadow-sm sm:p-10"
          style={{ borderColor: "rgb(var(--border))" }}
        >
          {/* ✅ Background image layer (VISIBLE now) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=60"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover blur-2xl scale-110 opacity-70"
            />

            {/* ✅ Soft color tint (subtle, not loud) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg," +
                  "color-mix(in srgb, rgb(var(--primary)) 14%, transparent)," +
                  "color-mix(in srgb, rgb(var(--accent)) 10%, transparent))",
              }}
            />

            {/* ✅ “Frosted” card wash so text stays readable */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "color-mix(in srgb, rgb(var(--card)) 78%, transparent)",
              }}
            />
          </div>

          {/* ✅ Content */}
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {title}
              </h3>
              <p className="mt-2 max-w-2xl text-[rgb(var(--muted))]">
                {subtitle}
              </p>
            </div>

            <Link href={buttonHref} className="btn btn-primary px-6 py-3">
              {buttonText}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

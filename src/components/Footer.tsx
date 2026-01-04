// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import Container from "@/src/components/Container";

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        borderColor: "rgb(var(--border))",
        background: "rgb(var(--background))",
      }}
    >
      <Container className="py-8 sm:py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            {/* ✅ Logo aligned normally (no negative margins, no push) */}
            <div className="flex items-center justify-start">
              {/* ✅ Bigger wrapper = bigger logo */}
              <span className="relative block h-16 w-[300px] sm:h-20 sm:w-[380px] lg:h-24 lg:w-[520px]">
                {/* Light mode logo */}
                <Image
                  src="/logo1.png"
                  alt="Yorkshire Global Consulting Inc. logo"
                  fill
                  quality={100}
                  sizes="(min-width: 1024px) 520px, (min-width: 640px) 380px, 300px"
                  className="absolute inset-0 object-contain object-left opacity-100 dark:opacity-0 transition-opacity duration-200"
                />

                {/* Dark mode logo */}
                <Image
                  src="/logo-w1.png"
                  alt="Yorkshire Global Consulting Inc. logo"
                  fill
                  quality={100}
                  sizes="(min-width: 1024px) 520px, (min-width: 640px) 380px, 300px"
                  className="absolute inset-0 object-contain object-left opacity-0 dark:opacity-100 transition-opacity duration-200"
                />
              </span>
            </div>

            <p className="mt-3 text-sm text-[rgb(var(--muted))]">
              Secure • Analyze • Deliver • Transform
            </p>
            <p className="mt-2 text-sm text-[rgb(var(--muted))]">
              Ontario, Canada — serving clients across industries.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Company</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-[rgb(var(--foreground))] hover:underline" href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="text-[rgb(var(--foreground))] hover:underline" href="/case-studies">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link className="text-[rgb(var(--foreground))] hover:underline" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Services</p>
            <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--muted))]">
              <li>SSDLc</li>
              <li>Cybersecurity</li>
              <li>Business Analysis</li>
              <li>Project Management</li>
              <li>Strategy Consulting</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Get in touch</p>
            <p className="mt-3 text-sm text-[rgb(var(--muted))]">
              For inquiries or consultations, use our contact form.
            </p>

            <Link href="/contact" className="btn btn-accent mt-4 px-4 py-2">
              Contact Us
            </Link>
          </div>
        </div>

        <div
          className="mt-8 flex flex-col gap-2 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderTop: "1px solid rgb(var(--border))",
            color: "rgb(var(--muted))",
          }}
        >
          <p>© {new Date().getFullYear()} Yorkshire Global Consulting Inc. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

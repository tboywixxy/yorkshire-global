import Link from "next/link";
import Container from "@/components/Container";

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
            <div className="flex items-center gap-2 font-semibold">
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold"
                style={{
                  background: "rgb(var(--primary))",
                  color: "rgb(var(--primary-foreground))",
                }}
              >
                YG
              </span>
              Yorkshire Global Consulting Inc.
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
          <p>
            © {new Date().getFullYear()} Yorkshire Global Consulting Inc. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

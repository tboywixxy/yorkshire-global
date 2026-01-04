import React from "react";
import Container from "@/src/components/Container";
import SectionHeading from "@/src/components/SectionHeading";

export default function WhoWeAreSection() {
  return (
    <section className="-mt-[35px] py-14 sm:-mt-[45px] sm:py-16 relative z-30" aria-label="Who we are">
      <Container>
        <SectionHeading
          title="Who We Are"
          subtitle="Yorkshire Global Consulting Inc. is a professional services firm based in Ontario, Canada. We support organizations across industries by improving how they build software, manage risks, analyze business needs, and deliver complex projects. Our work is grounded in practical experience, proven methods, and a commitment to client success."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Practical experience",
              text: "Grounded in real-world delivery, with structured methods that scale across teams.",
              img: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=1600&q=80",
            },
            {
              title: "Proven methods",
              text: "Security, analysis, governance, and delivery practices aligned to outcomes.",
              img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
            },
            {
              title: "Client success",
              text: "Clear communication and accountability—so projects move forward with confidence.",
              img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
            },
          ].map((c) => (
            <article key={c.title} className="card-img">
              <div className="card-img__media">
                <img
                  src={c.img}
                  alt={`${c.title} - Yorkshire Global Consulting Inc.`}
                  className="card-img__photo"
                  loading="lazy"
                />
                <div className="card-img__overlay" />
              </div>
              <div className="card-body">
                <p className="text-sm font-semibold">{c.title}</p>
                <p className="mt-2 text-sm text-[rgb(var(--muted))]">{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

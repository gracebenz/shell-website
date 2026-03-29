import Link from "next/link";

export default function Home() {
  return (
    <div className="px-6 md:px-12 py-20 md:py-32 flex flex-col gap-16">
      {/* Hero */}
      <section className="max-w-2xl">
        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight text-heading mb-6">
          Shell
        </h1>
        <p className="text-lg md:text-xl text-ink/60 leading-relaxed font-sans">
          Events, ideas, and writing.
        </p>
      </section>

      {/* Navigation tiles */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        <Link
          href="/events"
          className="group p-10 rounded-2xl border border-rim/40 bg-surface/20 hover:bg-surface/40 transition-colors flex flex-col gap-3"
        >
          <h2 className="font-serif text-2xl font-bold text-heading">Events</h2>
          <p className="text-sm text-ink/60 leading-relaxed">
            Upcoming gatherings and past happenings. Sign up to join.
          </p>
          <span className="text-xs text-accent font-medium mt-2 group-hover:underline">
            View events →
          </span>
        </Link>

        <Link
          href="/blog"
          className="group p-10 rounded-2xl border border-rim/40 bg-surface-alt/20 hover:bg-surface-alt/40 transition-colors flex flex-col gap-3"
        >
          <h2 className="font-serif text-2xl font-bold text-heading">Blog</h2>
          <p className="text-sm text-ink/60 leading-relaxed">
            Thoughts, reflections, and writing published on a rolling basis.
          </p>
          <span className="text-xs text-accent font-medium mt-2 group-hover:underline">
            Read posts →
          </span>
        </Link>
      </section>
    </div>
  );
}

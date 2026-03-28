import Link from "next/link";

export default function Nav() {
  return (
    <header className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-lilac-ash/40">
      <Link href="/" className="font-serif text-xl font-bold tracking-tight text-midnight-violet">
        Shell
      </Link>
      <nav className="flex items-center gap-8">
        <Link
          href="/events"
          className="text-sm font-medium tracking-wide text-ink/70 hover:text-deep-crimson transition-colors"
        >
          Events
        </Link>
        <Link
          href="/blog"
          className="text-sm font-medium tracking-wide text-ink/70 hover:text-deep-crimson transition-colors"
        >
          Blog
        </Link>
      </nav>
    </header>
  );
}

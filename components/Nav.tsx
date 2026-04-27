import Link from "next/link";

export default function Nav() {
  return (
    <header className="static-nav">
      <Link href="/#events" className="nav-link">Events</Link>
      <Link href="/" className="nav-brand">A Glass or Tu</Link>
      <Link href="/#blog" className="nav-link">Journal</Link>
    </header>
  );
}

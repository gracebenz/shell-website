import Link from "next/link";

const ztBold = {
  fontFamily: "ZT Yaglo, sans-serif",
  fontWeight: 400,
  fontSize: "0.9rem",
  color: "#e9c3b9",
  WebkitTextStroke: "0.8px #e9c3b9",
} as React.CSSProperties;

export default function Nav() {
  return (
    <header
      className="flex items-center justify-center px-8 md:px-16 py-4"
      style={{ backgroundColor: "#2d0719" }}
    >
      <nav className="flex items-center gap-6">
        <Link href="/#events" className="tracking-widest uppercase inline-block" style={ztBold}>
          Events
        </Link>
        <Link
          href="/"
          style={{ fontFamily: "Giomori, Georgia, serif", fontStyle: "italic", color: "#f0494e", letterSpacing: "0.05em" }}
          className="text-xl md:text-2xl uppercase transition-opacity hover:opacity-70"
          title="Back to home"
        >
          A Glass or Tu
        </Link>
        <Link href="/#blog" className="tracking-widest uppercase inline-block" style={ztBold}>
          Blog
        </Link>
      </nav>
    </header>
  );
}

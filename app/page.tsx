import Image from "next/image";
import Link from "next/link";
import oysters from "@/assets/oysters.jpg";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image src={oysters} alt="" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex flex-col items-center gap-6 text-white">
        <h1 style={{ fontFamily: "var(--font-fraunces)" }} className="text-6xl md:text-8xl font-bold tracking-tight">
          Shell
        </h1>
        <nav className="flex gap-8 text-base font-medium tracking-widest uppercase text-white/70">
          <Link href="/events" className="hover:text-white transition-colors">Events</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        </nav>
      </div>
    </div>
  );
}

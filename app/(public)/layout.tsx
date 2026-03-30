import Nav from "@/components/Nav";
import WavyRule from "@/components/WavyRule";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="py-6 flex flex-col items-center gap-3" style={{ backgroundColor: "#2d0719" }}>
        <WavyRule />
        <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>© Shell Tu</p>
      </footer>
    </>
  );
}

import Nav from "@/components/Nav";

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <Nav />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}

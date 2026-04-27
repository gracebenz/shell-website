import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div style={{ maxWidth: "40rem" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 className="admin-heading">Dashboard</h1>
        <div className="admin-rule" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <Link href="/admin/events" className="admin-card">
          <div className="admin-card-title">Events</div>
          <div className="admin-card-desc">Add, edit, and remove gatherings.</div>
        </Link>
        <Link href="/admin/blog" className="admin-card">
          <div className="admin-card-title">Journal</div>
          <div className="admin-card-desc">Write, edit, and publish entries.</div>
        </Link>
      </div>
    </div>
  );
}

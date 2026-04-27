"use client";

import { deleteEvent } from "@/app/actions/update-event";

export default function DeleteEventButton({ id }: { id: string }) {
  return (
    <form action={deleteEvent.bind(null, id)}>
      <button
        type="submit"
        className="admin-btn-danger"
        onClick={(e) => {
          if (!confirm("Delete this event? This can't be undone.")) e.preventDefault();
        }}
      >
        Delete
      </button>
    </form>
  );
}

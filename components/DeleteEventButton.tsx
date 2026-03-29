"use client";

import { deleteEvent } from "@/app/actions/update-event";

export default function DeleteEventButton({ id }: { id: string }) {
  return (
    <form action={deleteEvent.bind(null, id)} className="flex items-center">
      <button
        type="submit"
        className="text-xs text-ink/40 hover:text-accent transition-colors"
        onClick={(e) => {
          if (!confirm("Delete this event? This can't be undone.")) e.preventDefault();
        }}
      >
        Delete
      </button>
    </form>
  );
}

"use client";

import { useActionState, useRef } from "react";
import { createEvent, type EventFormState } from "@/app/actions/create-event";
import { updateEvent, deleteEvent } from "@/app/actions/update-event";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  body: string;
  capacity: number;
  tags: string[];
};

const initial: EventFormState = { status: "idle", message: "" };

const inputClass =
  "rounded-lg border border-rim/60 bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-accent/40 w-full";

const labelClass = "text-xs font-medium text-ink/60 uppercase tracking-wide";

export default function EventForm({ event }: { event?: Event }) {
  const isEdit = !!event;
  const dateRef = useRef<HTMLInputElement>(null);

  const action = isEdit
    ? updateEvent.bind(null, event.id)
    : createEvent;

  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <>
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className={labelClass}>Title</label>
        <input id="title" name="title" type="text" required placeholder="Spring Foraging Walk"
          defaultValue={event?.title} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className={labelClass}>Date</label>
          <input
            ref={dateRef}
            id="date" name="date" type="date" required
            defaultValue={event?.date}
            onClick={() => dateRef.current?.showPicker()}
            className={`${inputClass} cursor-pointer`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="time" className={labelClass}>Time</label>
          <input id="time" name="time" type="text" required placeholder="7:00 PM"
            defaultValue={event?.time} className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="location" className={labelClass}>Venue name</label>
        <input id="location" name="location" type="text" required placeholder="Prospect Park"
          defaultValue={event?.location} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="address" className={labelClass}>Address</label>
        <input id="address" name="address" type="text" required placeholder="Prospect Park, Brooklyn, NY 11225"
          defaultValue={event?.address} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className={labelClass}>
          Short description <span className="normal-case text-ink/40">(shown on event card)</span>
        </label>
        <textarea id="description" name="description" required rows={2}
          placeholder="One or two sentences for the listing."
          defaultValue={event?.description} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="body" className={labelClass}>
          Full description <span className="normal-case text-ink/40">(shown on event page)</span>
        </label>
        <textarea id="body" name="body" required rows={6}
          placeholder="All the details about the event..."
          defaultValue={event?.body} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="capacity" className={labelClass}>Capacity</label>
          <input id="capacity" name="capacity" type="number" required min={1} placeholder="20"
            defaultValue={event?.capacity} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tags" className={labelClass}>
            Tags <span className="normal-case text-ink/40">(comma separated)</span>
          </label>
          <input id="tags" name="tags" type="text" placeholder="outdoors, food, evening"
            defaultValue={event?.tags?.join(", ")} className={inputClass} />
        </div>
      </div>

      {state.status === "error" && (
        <p className="text-sm text-accent">{state.message}</p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-heading px-6 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-80 disabled:opacity-40"
        >
          {pending ? (isEdit ? "Saving…" : "Creating…") : (isEdit ? "Save changes" : "Create event")}
        </button>
      </div>
    </form>

    {isEdit && (
      <form action={deleteEvent.bind(null, event.id)} className="mt-4">
        <button
          type="submit"
          className="text-sm text-ink/40 hover:text-accent transition-colors"
          onClick={(e) => {
            if (!confirm("Delete this event? This can't be undone.")) e.preventDefault();
          }}
        >
          Delete event
        </button>
      </form>
    )}
    </>
  );
}

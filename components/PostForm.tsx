"use client";

import { useActionState } from "react";
import { createPost, type PostFormState } from "@/app/actions/create-post";
import { updatePost, deletePost } from "@/app/actions/update-post";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  published_at: string;
};

const initial: PostFormState = { status: "idle", message: "" };

const inputClass =
  "rounded-lg border border-rim/60 bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-accent/40 w-full";

const labelClass = "text-xs font-medium text-ink/60 uppercase tracking-wide";

export default function PostForm({ post }: { post?: Post }) {
  const isEdit = !!post;
  const action = isEdit ? updatePost.bind(null, post.slug) : createPost;
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <>
      <form action={formAction} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className={labelClass}>Title</label>
          <input id="title" name="title" type="text" required
            placeholder="On the merits of eating alone"
            defaultValue={post?.title} className={inputClass} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="published_at" className={labelClass}>Date</label>
          <input id="published_at" name="published_at" type="date" required
            defaultValue={post?.published_at} className={`${inputClass} cursor-pointer`}
            onClick={(e) => (e.target as HTMLInputElement).showPicker()} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="excerpt" className={labelClass}>
            Excerpt <span className="normal-case text-ink/40">(shown on listing)</span>
          </label>
          <textarea id="excerpt" name="excerpt" required rows={2}
            placeholder="A short teaser for the post."
            defaultValue={post?.excerpt} className={inputClass} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="body" className={labelClass}>Body</label>
          <textarea id="body" name="body" required rows={14}
            placeholder="Write the full post here..."
            defaultValue={post?.body} className={inputClass} />
        </div>

        {state.status === "error" && (
          <p className="text-sm text-accent">{state.message}</p>
        )}

        <div className="pt-2">
          <button type="submit" disabled={pending}
            className="rounded-lg bg-heading px-6 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-80 disabled:opacity-40">
            {pending ? (isEdit ? "Saving…" : "Publishing…") : (isEdit ? "Save changes" : "Publish post")}
          </button>
        </div>
      </form>

      {isEdit && (
        <form action={deletePost.bind(null, post.slug)} className="mt-4">
          <button type="submit"
            className="text-sm text-ink/40 hover:text-accent transition-colors"
            onClick={(e) => {
              if (!confirm("Delete this post? This can't be undone.")) e.preventDefault();
            }}>
            Delete post
          </button>
        </form>
      )}
    </>
  );
}

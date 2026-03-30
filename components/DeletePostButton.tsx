"use client";

import { deletePost } from "@/app/actions/update-post";

export default function DeletePostButton({ slug }: { slug: string }) {
  return (
    <form action={deletePost.bind(null, slug)} className="flex items-center">
      <button type="submit"
        className="text-xs text-ink/40 hover:text-accent transition-colors"
        onClick={(e) => {
          if (!confirm("Delete this post? This can't be undone.")) e.preventDefault();
        }}>
        Delete
      </button>
    </form>
  );
}

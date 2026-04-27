"use client";

import { deletePost } from "@/app/actions/update-post";

export default function DeletePostButton({ slug }: { slug: string }) {
  return (
    <form action={deletePost.bind(null, slug)}>
      <button
        type="submit"
        className="admin-btn-danger"
        onClick={(e) => {
          if (!confirm("Delete this post? This can't be undone.")) e.preventDefault();
        }}
      >
        Delete
      </button>
    </form>
  );
}

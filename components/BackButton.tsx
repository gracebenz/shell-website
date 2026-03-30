"use client";

import { useRouter } from "next/navigation";

export default function BackButton({
  fallback,
  className,
  style,
}: {
  fallback: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const router = useRouter();

  function handleClick() {
    try {
      if (document.referrer && new URL(document.referrer).origin === window.location.origin) {
        router.back();
        return;
      }
    } catch {}
    router.push(fallback);
  }

  return (
    <button onClick={handleClick} className={className} style={style}>
      ← Back
    </button>
  );
}

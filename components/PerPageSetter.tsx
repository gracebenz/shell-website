"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function PerPageSetter({
  scrollId,
  cardsId,
  gapH = 8,
  maxCols = 1,
}: {
  scrollId: string;  // id of the overflow-y-auto container
  cardsId: string;   // id of the cards list / grid wrapper
  gapH?: number;     // gap between card rows in px
  maxCols?: number;  // columns on desktop (1 for blog, 2 for events)
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollEl = document.getElementById(scrollId);
    const cardsEl  = document.getElementById(cardsId);
    if (!scrollEl || !cardsEl) return;

    const firstCard = cardsEl.firstElementChild as HTMLElement | null;
    if (!firstCard) return; // no cards rendered to measure

    // Visible height of the scrollable container
    const scrollH = scrollEl.clientHeight;

    // Distance from the top of the scroll container to where cards start
    const scrollTop = scrollEl.getBoundingClientRect().top;
    const cardsTop  = cardsEl.getBoundingClientRect().top;
    const headerOffset = cardsTop - scrollTop;

    // Height of one rendered card
    const cardH = firstCard.getBoundingClientRect().height;

    // How many rows fit: N cards + (N-1) gaps ≤ available
    const available = scrollH - headerOffset - gapH; // subtract one gap as bottom buffer
    const cols  = Math.min(maxCols, window.innerWidth >= 768 ? 2 : 1);
    const rows  = Math.max(2, Math.floor((available + gapH) / (cardH + gapH)));
    const perPage = rows * cols;

    if (parseInt(searchParams.get("perPage") ?? "0", 10) !== perPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("perPage", String(perPage));
      params.delete("page");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

"use client";

import type { AnchorHTMLAttributes } from "react";
import { track, type EventName, type EventParams } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  event: EventName;
  params?: EventParams;
};

/** A plain <a> that reports one analytics event on click. Navigation is never delayed or blocked. */
export function TrackedLink({ event, params, onClick, children, ...rest }: Props) {
  const external = /^https?:\/\//.test(rest.href);
  return (
    <a
      {...(external ? { rel: "noopener noreferrer" } : {})}
      {...rest}
      onClick={(e) => {
        track(event, params);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

"use client";

import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";

type Tab = { id: string; label: string };

/**
 * WAI-ARIA tabs: roving tabindex, ←/→/Home/End move and activate. Panels are
 * rendered by the caller through `renderPanel` so each keeps its own markup.
 */
export function Tabs({
  tabs,
  active,
  onChange,
  label,
  renderPanel,
  panelClassName,
}: {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  label: string;
  renderPanel: (id: string) => ReactNode;
  panelClassName?: string;
}) {
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    onChange(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <>
      <div className="tabs" role="tablist" aria-label={label}>
        {tabs.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              className="tab"
              onClick={() => onChange(t.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${base}-panel-${t.id}`}
          aria-labelledby={`${base}-tab-${t.id}`}
          hidden={t.id !== active}
          tabIndex={0}
          className={panelClassName}
        >
          {t.id === active ? renderPanel(t.id) : null}
        </div>
      ))}
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { EVENTS } from "@/lib/analytics";
import { NAV_LINKS, SITE } from "@/lib/site";
import { IconClose, IconMenu } from "./icons";
import { TrackedLink } from "./TrackedLink";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer: lock scroll, focus the first item, trap Tab, Esc closes, focus returns to the toggle.
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const toggle = toggleRef.current;
    const focusables = () =>
      Array.from(drawer?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    document.body.style.overflow = "hidden";
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 960px)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      toggle?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="header" data-scrolled={scrolled}>
        <div className="container header__inner">
          <a href="#topo" className="brand" aria-label="Na Pista — início">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, official PNG used as-is */}
            <img src="/brand/mark-sm.png" alt="" width={22} height={26} />
            <span>Na Pista</span>
          </a>

          <nav className="nav" aria-label="Principal">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <TrackedLink
              href={SITE.consoleLoginUrl}
              className="btn btn--ghost btn--sm"
              event={EVENTS.CONSOLE_LOGIN}
              params={{ location: "header" }}
            >
              Entrar
            </TrackedLink>
            <TrackedLink
              href="#comecar"
              className="btn btn--primary btn--sm"
              event={EVENTS.START_CTA}
              params={{ location: "header" }}
            >
              Começar
            </TrackedLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="menu-movel"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <IconMenu size={22} />
          </button>
        </div>
      </header>

      <div className="drawer-backdrop" data-open={open} onClick={close} aria-hidden="true" />
      <div
        ref={drawerRef}
        id="menu-movel"
        className="drawer"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
      >
        <div className="drawer__top">
          <span className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, official PNG used as-is */}
            <img src="/brand/mark-sm.png" alt="" width={22} height={26} />
            <span>Na Pista</span>
          </span>
          <button type="button" className="menu-toggle" aria-label="Fechar menu" onClick={close}>
            <IconClose size={22} />
          </button>
        </div>
        <nav className="drawer__nav" aria-label="Principal (móvel)">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="drawer__actions">
          <TrackedLink
            href="#comecar"
            className="btn btn--primary"
            event={EVENTS.START_CTA}
            params={{ location: "mobile_menu" }}
            onClick={close}
          >
            Começar
          </TrackedLink>
          <TrackedLink
            href={SITE.consoleLoginUrl}
            className="btn"
            event={EVENTS.CONSOLE_LOGIN}
            params={{ location: "mobile_menu" }}
          >
            Entrar na consola
          </TrackedLink>
        </div>
      </div>
    </>
  );
}

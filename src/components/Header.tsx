'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav, site } from '@/data/site';

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  // the bar gains a surface once the page has scrolled past its first 40px
  useEffect(() => {
    const probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:40px;pointer-events:none';
    document.body.prepend(probe);
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting));
    io.observe(probe);
    return () => {
      io.disconnect();
      probe.remove();
    };
  }, []);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add('menu-open');
    const el = panel.current!;
    el.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key !== 'Tab') return;
      const f = [toggle.current!, ...el.querySelectorAll<HTMLElement>('a')];
      const i = f.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    };
    addEventListener('keydown', onKey);
    return () => {
      removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('menu-open');
      toggle.current?.focus();
    };
  }, [open]);

  const current = (href: string) => (path === href ? 'page' : undefined);

  return (
    <header className={`bar${solid ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
      <Link href="/" className="bar__logo" aria-label={`${site.name} home`}>
        <img src="/media/logo-gold.webp" alt="" width={900} height={265} />
      </Link>
      <nav className="bar__nav" aria-label="Main">
        <ul>
          {nav.map((n) => (
            <li key={n.href}>
              <Link className="draw" href={n.href} aria-current={current(n.href)}>{n.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <a className="btn btn--gold bar__cta" href={site.orderUrl}><span>Order online</span></a>
      <button ref={toggle} className="bar__toggle" type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
        <span className="bar__toggle-lines" aria-hidden="true" />
        {open ? 'Close' : 'Menu'}
      </button>
      <div id="menu" ref={panel} className="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}>
        <ul className="menu__list">
          <li><Link href="/" aria-current={current('/')}>Home</Link></li>
          {nav.map((n) => (
            <li key={n.href}><Link href={n.href} aria-current={current(n.href)}>{n.label}</Link></li>
          ))}
        </ul>
        <a className="btn btn--gold menu__cta" href={site.orderUrl}><span>Order online</span></a>
        <p className="menu__meta">
          {site.location.city}, {site.location.region}. {site.hours.label}, {site.hours.open} to {site.hours.close}.<br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>
    </header>
  );
}

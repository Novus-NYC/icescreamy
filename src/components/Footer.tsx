import Link from 'next/link';
import { nav, site } from '@/data/site';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot__top">
        <p className="foot__line">{site.lines.slogan}</p>
        <a className="btn btn--gold" href={site.orderUrl}><span>Order online</span></a>
      </div>
      <div className="foot__grid">
        <div>
          <h2 className="foot__h">Find us</h2>
          <p>{site.location.city}, New York<br />Serving {site.location.serviceArea}</p>
        </div>
        <div>
          <h2 className="foot__h">Hours</h2>
          <p>{site.hours.label}<br />{site.hours.open} to {site.hours.close}</p>
        </div>
        <div>
          <h2 className="foot__h">Say hello</h2>
          <p>
            <a className="u" href={`mailto:${site.email}`}>{site.email}</a><br />
            <a className="u" href={site.phone.href}>{site.phone.display}</a><br />
            <a className="u" href={site.instagram.url} target="_blank" rel="noreferrer">Instagram {site.instagram.handle}</a>
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="foot__h">Pages</h2>
          <ul>
            <li><Link className="u" href="/">Home</Link></li>
            {nav.map((n) => <li key={n.href}><Link className="u" href={n.href}>{n.label}</Link></li>)}
          </ul>
        </nav>
      </div>
      <img className="foot__logo" src="/media/logo-gold.webp" alt={site.name} width={900} height={265} loading="lazy" decoding="async" />
      <div className="foot__base">
        <p>© {new Date().getFullYear()} {site.legalName}</p>
        <a className="u" href="https://novusnyc.org" target="_blank" rel="noreferrer">Made by Novus</a>
      </div>
    </footer>
  );
}

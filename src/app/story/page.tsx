import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/data/site';
import { SKYLINE } from '@/scene/chapters';

export const metadata: Metadata = {
  title: 'Our story',
  description: 'IceScreamy brings the flavors of the African diaspora and the Caribbean to Brooklyn, one artisanal pint at a time.',
  alternates: { canonical: '/story' },
};

export default function StoryPage() {
  return (
    <>
      <section className="page-top">
        <h1 className="page-h" data-intro>
          Caribbean roots.<br />
          <em className="gold">Brooklyn bold.</em>
        </h1>
      </section>

      <section className="story-split" aria-label="Origins">
        <p className="story-split__quote">{site.lines.origins}</p>
        <div className="story-split__body" data-reveal style={{ '--d': 1 } as React.CSSProperties}>
          <p>
            Every flavor starts with a story: guava and warm spice in Caribbean Liberation, hibiscus in Red, Black &amp; Bliss,
            toasted coconut in Raspberry Coconut. Then it is crafted in Brooklyn with premium ingredients and packed in our
            emerald pint.
          </p>
          <p className="muted">
            {site.founder.title}: {site.founder.name}.
          </p>
          <Link className="arrow" href="/flavors">Taste the collection <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="facts" aria-labelledby="facts-h">
        <h2 id="facts-h" className="sec-h" data-reveal>The short version</h2>
        <ul className="facts__list">
          <li data-reveal><strong>Brooklyn</strong><span>Where every pint is crafted.</span></li>
          <li data-reveal style={{ '--d': 1 } as React.CSSProperties}><strong>The diaspora</strong><span>African and Caribbean flavors are the starting point.</span></li>
          <li data-reveal style={{ '--d': 2 } as React.CSSProperties}><strong>Tri-state</strong><span>Serving the New York tri-state area.</span></li>
          <li data-reveal style={{ '--d': 3 } as React.CSSProperties}><strong>Daily</strong><span>Open {site.hours.open} to {site.hours.close}.</span></li>
        </ul>
        <div className="skyline-band" aria-hidden="true">
          <svg viewBox="0 0 1200 220"><path d={SKYLINE} /></svg>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import { flavors, site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Flavors',
  description: 'The Bold Heritage Collection and more pints from IceScreamy: Caribbean Liberation, Raspberry Coconut, Red, Black & Bliss, Grapenut and more.',
  alternates: { canonical: '/flavors' },
};

const heritage = flavors.filter((f) => f.collection === 'bold-heritage');
const pints = flavors.filter((f) => f.collection === 'pint');

export default function FlavorsPage() {
  return (
    <>
      <section className="page-top">
        <div className="page-top__row">
          <h1 className="page-h" data-intro>The flavors</h1>
          <p className="page-top__lede" data-intro style={{ '--d': 1 } as React.CSSProperties}>
            Caramel and guava, coconut and raspberry, hibiscus and black currant. Rich and flavorful, every one.
          </p>
        </div>
      </section>

      <section className="heritage" aria-labelledby="heritage-h">
        <div className="heritage__name" data-reveal>
          <h2 id="heritage-h">{site.collectionName}</h2>
          <p>{site.lines.slogan}</p>
        </div>
        <ul>
          {heritage.map((f, i) => (
            <li key={f.slug} id={f.slug} className="row" data-reveal>
              {/* the home scene renders the collection as chapters 3 to 5; these are those frames */}
              <img className="row__swatch" src={`/media/churn-${3 + i}.webp`} width={800} height={800} alt="" loading="lazy" decoding="async" />
              <h3>{f.name}</h3>
              <p>{f.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="shelf" aria-labelledby="shelf-h">
        <div className="case__head" data-reveal>
          <h2 id="shelf-h" className="sec-h">Pints</h2>
          <p className="case__note">
            Ready to order online. <a className="u" href={site.orderUrl}>See what&rsquo;s available today</a>.
          </p>
        </div>
        <ul className="case__list">
          {pints.map((f, i) => (
            <li key={f.slug} id={f.slug} className="pint" data-reveal style={{ '--d': i } as React.CSSProperties}>
              <a href={site.orderUrl} className="pint__link">
                <span className="pint__pool" aria-hidden="true" style={{ '--b': f.swirl[0], '--r': f.swirl[1] } as React.CSSProperties} />
                <img src={f.image!.src} width={f.image!.width} height={f.image!.height} alt={`${f.name} pint`} loading="lazy" decoding="async" />
                <span className="pint__name">{f.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

import Link from 'next/link';
import ChurnStage from '@/components/ChurnStage';
import Scoop from '@/components/Scoop';
import { SKYLINE } from '@/scene/chapters';
import { flavors, site } from '@/data/site';

const heritage = flavors.filter((f) => f.collection === 'bold-heritage');
const pints = flavors.filter((f) => f.collection === 'pint');

export default function HomePage() {
  return (
    <>
      <section className="churn" data-churn aria-label="The IceScreamy story">
        <div className="churn__stage" aria-hidden="true">
          <ChurnStage />
        </div>

        <div className="churn__chapters">
          <article className="ch ch--hero" data-chapter="0">
            <Scoop index={0} />
            <div className="ch__copy">
              <h1 className="ch__title" data-intro>
                Caribbean-inspired ice cream, <em>crafted in Brooklyn.</em>
              </h1>
              <p className="ch__lede" data-intro style={{ '--d': 1 } as React.CSSProperties}>{site.lines.hero}</p>
              <div className="ch__actions" data-intro style={{ '--d': 2 } as React.CSSProperties}>
                <a className="btn btn--gold" href={site.orderUrl}><span>Order online</span></a>
                <Link className="btn btn--line" href="/flavors"><span>See the flavors</span></Link>
              </div>
            </div>
            <p className="ch__cue" aria-hidden="true">Scroll to churn</p>
          </article>

          <article className="ch" data-chapter="1">
            <Scoop index={1} />
            <div className="ch__copy" data-reveal>
              <h2 className="ch__h">Island roots.</h2>
              <p className="ch__p">
                Our ice cream is inspired by the rich cultures of the African diaspora. Hibiscus, guava, warm spice: the
                flavors of the islands, folded into cream.
              </p>
            </div>
          </article>

          <article className="ch" data-chapter="2">
            <Scoop index={2}>
              <svg className="ch__skyline" viewBox="0 0 1200 220" aria-hidden="true"><path d={SKYLINE} /></svg>
            </Scoop>
            <div className="ch__copy" data-reveal>
              <h2 className="ch__h">Brooklyn energy.</h2>
              <p className="ch__p">
                Crafted in Brooklyn with premium ingredients, in an emerald pint wrapped in a gold skyline. We serve{' '}
                {site.location.serviceArea}.
              </p>
            </div>
          </article>

          {heritage.map((f, i) => (
            <article className="ch ch--flavor" data-chapter={3 + i} key={f.slug}>
              <Scoop index={3 + i} />
              <div className="ch__copy" data-reveal>
                <p className="ch__kicker">{site.collectionName}</p>
                <h2 className="ch__flavor">{f.name}</h2>
                <p className="ch__p">{f.description}</p>
              </div>
            </article>
          ))}

          <article className="ch ch--end" data-chapter="6">
            <Scoop index={6} />
            <div className="ch__copy" data-reveal>
              <h2 className="ch__h">{site.lines.story}</h2>
              <p className="ch__p">Order pints online, or book IceScreamy for your next event.</p>
              <div className="ch__actions">
                <a className="btn btn--gold" href={site.orderUrl}><span>Order online</span></a>
                <Link className="btn btn--line" href="/events"><span>Book an event</span></Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="case" aria-labelledby="case-h">
        <div className="case__head" data-reveal>
          <h2 id="case-h" className="sec-h">From the freezer case</h2>
          <p className="case__note">More pints, each with the gold skyline on the side.</p>
        </div>
        <ul className="case__list">
          {pints.map((f, i) => (
            <li key={f.slug} className="pint" data-reveal style={{ '--d': i } as React.CSSProperties}>
              <Link href={`/flavors#${f.slug}`} className="pint__link">
                <span className="pint__pool" aria-hidden="true" style={{ '--b': f.swirl[0], '--r': f.swirl[1] } as React.CSSProperties} />
                <img src={f.image!.src} width={f.image!.width} height={f.image!.height} alt={`${f.name} pint`} loading="lazy" decoding="async" />
                <span className="pint__name">{f.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link className="arrow" href="/flavors">All flavors <span aria-hidden="true">→</span></Link>
      </section>

      <section className="visit" aria-labelledby="visit-h">
        <h2 id="visit-h" className="visit__h" data-reveal>
          Open daily, <span className="gold">{site.hours.open} to {site.hours.close}.</span>
        </h2>
        <div className="visit__cols" data-reveal>
          <p>Based in {site.location.city}, New York, and serving {site.location.serviceArea}.</p>
          <p>
            Questions, big orders or a flavor request? Write to <a className="u" href={`mailto:${site.email}`}>{site.email}</a> or call{' '}
            <a className="u" href={site.phone.href}>{site.phone.display}</a>.
          </p>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import InquiryForm from '@/components/InquiryForm';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Events & partners',
  description: 'Book IceScreamy for your event, or partner with us. Caribbean-inspired ice cream from Brooklyn, serving the New York tri-state area.',
  alternates: { canonical: '/events' },
};

export default function EventsPage() {
  return (
    <>
      <section className="page-top">
        <div className="page-top__row">
          <h1 className="page-h" data-intro>Bring the scoop to you</h1>
          <p className="page-top__lede" data-intro style={{ '--d': 1 } as React.CSSProperties}>
            Book IceScreamy for an event, or talk to us about a partnership. We serve {site.location.serviceArea}.
          </p>
        </div>
      </section>

      <section className="inquire" aria-label="Get in touch">
        <div className="inquire__paths" data-reveal>
          <div>
            <h2>Book an event</h2>
            <p>Tell us the date, the place and how many guests, and we&rsquo;ll reply by email.</p>
          </div>
          <div id="partner">
            <h2>Partnerships</h2>
            <p>Want to carry our pints or collaborate on something? Tell us what you have in mind.</p>
          </div>
          <div>
            <h2>Rather talk?</h2>
            <p>
              Call <a className="u" href={site.phone.href}>{site.phone.display}</a> or write to{' '}
              <a className="u" href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </div>
        <InquiryForm email={site.email} />
      </section>
    </>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="lost">
      <span className="lost__drip" aria-hidden="true" />
      <h1 className="page-h">This scoop <em className="gold">melted.</em></h1>
      <p>The page you were looking for isn&rsquo;t in the freezer. The flavors are still cold, though.</p>
      <div className="ch__actions">
        <Link className="btn btn--gold" href="/flavors"><span>See the flavors</span></Link>
        <Link className="btn btn--line" href="/"><span>Back home</span></Link>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';

// No backend yet: the form writes a clear email and opens the visitor's mail app.
export default function InquiryForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const v = (k: string) => String(d.get(k) || '').trim();
    const subject = `${v('type')} inquiry from ${v('name')}`;
    const body = [`Name: ${v('name')}`, `Email: ${v('from')}`, `Type: ${v('type')}`];
    if (v('date')) body.push(`Date: ${v('date')}`);
    if (v('place')) body.push(`Location: ${v('place')}`);
    if (v('guests')) body.push(`Guests: ${v('guests')}`);
    body.push('', v('message'));
    location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.join('\n'))}`;
    setSent(true);
  };

  return (
    <form className="form" onSubmit={submit} data-reveal style={{ '--d': 1 } as React.CSSProperties}>
      <div className="field">
        <label htmlFor="f-name">Your name</label>
        <input id="f-name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="f-from">Email</label>
        <input id="f-from" name="from" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="f-type">What is it for?</label>
        <select id="f-type" name="type" defaultValue="Event">
          <option>Event</option>
          <option>Partnership</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-date">Date <span>(if you have one)</span></label>
        <input id="f-date" name="date" type="date" />
      </div>
      <div className="field">
        <label htmlFor="f-place">Location <span>(optional)</span></label>
        <input id="f-place" name="place" autoComplete="address-level2" />
      </div>
      <div className="field">
        <label htmlFor="f-guests">Guests <span>(optional)</span></label>
        <input id="f-guests" name="guests" inputMode="numeric" />
      </div>
      <div className="field field--wide">
        <label htmlFor="f-msg">Tell us more</label>
        <textarea id="f-msg" name="message" required />
      </div>
      <div className="form__foot">
        <button className="btn btn--gold" type="submit"><span>Write the email</span></button>
        <p>This opens your email app with everything filled in, addressed to {email}.</p>
      </div>
      <p className="form__status" role="status">{sent ? 'Your email app should be open. Hit send there and we will get back to you.' : ''}</p>
    </form>
  );
}

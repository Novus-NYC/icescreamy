// The art-directed still for a chapter: the same shader, pre-rendered (scripts/render-stills.mjs).
// Shown when the live scene is not running (reduced motion, no JS, no WebGL).
export default function Scoop({ index, children }: { index: number; children?: React.ReactNode }) {
  return (
    <div className="still" aria-hidden="true">
      <img className="still__scoop" src={`/media/churn-${index}.webp`} width={800} height={800} alt="" loading="lazy" decoding="async" />
      {children}
    </div>
  );
}

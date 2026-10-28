'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { createChurn, type ChurnUniforms } from '@/scene/churn';
import { chapters, SKYLINE, type ChapterState } from '@/scene/chapters';

const BG: [number, number, number] = [0x0b / 255, 0x33 / 255, 0x24 / 255];
const rgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};
const cols = chapters.map((s) => ({ base: rgb(s.base), rib: rgb(s.rib), fleck: rgb(s.fleck) }));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const mix3 = (a: number[], b: number[], t: number): [number, number, number] => [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];
const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

/**
 * The driver: one float (the chapter under the middle of the viewport) decides the scoop,
 * its marble and the skyline. It reads scroll position on the GSAP ticker and eases toward it,
 * so the page scrolls natively and the scene glides behind.
 */
export default function ChurnStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skylineRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const root = canvas.closest<HTMLElement>('[data-churn]');
    if (!root) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce.matches || saveData) return;

    const churn = createChurn(canvas);
    if (!churn) return;
    const html = document.documentElement;
    html.classList.add('gl-on');

    const marks = [...root.querySelectorAll<HTMLElement>('[data-chapter]')];
    const skyline = skylineRef.current;
    let centers: number[] = [];
    let narrow = false;
    let cw = 1, ch = 1;
    let drop = 1; // adaptive resolution factor
    let scale = 1;

    const measure = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      cw = w; ch = h;
      narrow = w < 760 || w / h < 0.9;
      scale = Math.min(devicePixelRatio || 1, w < 700 ? 1.25 : 1.5) * drop;
      churn.resize(w, h, scale);
      centers = marks.map((m) => {
        const r = m.getBoundingClientRect();
        return r.top + scrollY + r.height / 2;
      });
    };
    measure();

    const target = () => {
      const y = scrollY + innerHeight / 2;
      if (y <= centers[0]) return 0;
      for (let i = 1; i < centers.length; i++) {
        if (y < centers[i]) return i - 1 + (y - centers[i - 1]) / (centers[i] - centers[i - 1]);
      }
      return centers.length - 1;
    };

    let cur = target();
    const aim = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      aim.x = e.clientX / innerWidth - 0.5;
      aim.y = 0.5 - e.clientY / innerHeight;
    };
    addEventListener('pointermove', onMove, { passive: true });

    const u: ChurnUniforms = {
      c: [0.7, 0.5], r: 0.4, twist: 0, churn: 0, seed: 0, ribbon: 0.2,
      base: cols[0].base, rib: cols[0].rib, fleck: cols[0].fleck, bg: BG, mouse: [0, 0], time: 0,
    };
    let lastDraw = -1;
    let slow = 0;
    let first = true;

    const tick = (time: number, delta: number) => {
      const r = gsap.ticker.deltaRatio(60);
      cur += (target() - cur) * (1 - Math.pow(0.9, r));
      mouse.x += (aim.x - mouse.x) * (1 - Math.pow(0.95, r));
      mouse.y += (aim.y - mouse.y) * (1 - Math.pow(0.95, r));

      const i = Math.min(chapters.length - 2, Math.floor(cur));
      const f = smooth(0.18, 0.82, cur - i);
      const a: ChapterState = chapters[i], b: ChapterState = chapters[i + 1];
      const pa = narrow ? a.phone : a.desk, pb = narrow ? b.phone : b.desk;
      u.c = [mix(pa[0], pb[0], f) + mouse.x * 0.012, mix(pa[1], pb[1], f) + mouse.y * 0.012];
      u.r = mix(a.r, b.r, f) * (narrow ? 1.05 : 1);
      // on squarer screens push the scoop right so it never sits under the copy column
      if (!narrow) u.c[0] = Math.max(u.c[0], 0.46 + (u.r * Math.min(cw, ch)) / cw);
      u.twist = mix(a.twist, b.twist, f);
      u.ribbon = mix(a.ribbon, b.ribbon, f);
      u.seed = mix(a.seed, b.seed, f);
      u.churn = cur * 1.2 + time * 0.04;
      u.base = mix3(cols[i].base, cols[i + 1].base, f);
      u.rib = mix3(cols[i].rib, cols[i + 1].rib, f);
      u.fleck = mix3(cols[i].fleck, cols[i + 1].fleck, f);
      u.mouse = [mouse.x, mouse.y];
      u.time = time;
      churn.render(u);
      if (first) {
        first = false;
        canvas.classList.add('is-live');
      }

      // the skyline from the pint draws itself through the Brooklyn chapter
      const draw = Math.round(smooth(1.35, 1.95, cur) * (1 - smooth(2.45, 2.95, cur)) * 1000) / 1000;
      if (skyline && draw !== lastDraw) {
        skyline.style.setProperty('--draw', String(draw));
        lastDraw = draw;
      }

      // adaptive resolution: if frames run long, render fewer pixels
      slow = delta > 24 ? slow + 1 : Math.max(0, slow - 1);
      if (slow > 30 && drop > 0.5) {
        drop *= 0.8;
        measure();
        slow = 0;
      }
    };

    let running = false;
    let onScreen = true;
    const sync = () => {
      const want = onScreen && !document.hidden;
      if (want && !running) gsap.ticker.add(tick);
      if (!want && running) gsap.ticker.remove(tick);
      running = want;
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    io.observe(root);
    document.addEventListener('visibilitychange', sync);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    addEventListener('resize', measure);
    sync();

    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      ro.disconnect();
      removeEventListener('resize', measure);
      removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', sync);
      html.classList.remove('gl-on');
      churn.destroy();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="churn__canvas" />
      <svg ref={skylineRef} className="churn__skyline" viewBox="0 0 1200 220" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <path pathLength={1} d={SKYLINE} />
      </svg>
    </>
  );
}

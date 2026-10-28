import localFont from 'next/font/local';

export const zodiak = localFont({
  src: [
    { path: '../fonts/zodiak-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/zodiak-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/zodiak-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

export const generalSans = localFont({
  src: [
    { path: '../fonts/general-sans-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/general-sans-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/general-sans-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-text',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

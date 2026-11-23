import React, { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { waLink, DEFAULT_WA_TEXT } from '../data/company';

/*
 * Phone-only quote bar.
 *
 * On a desktop a buyer can see the header button at any scroll position. On a
 * phone the header collapses and, by the time someone has read two sections of
 * a family page, the only route back to the quote form is a scroll to the top.
 * This keeps one action in reach without covering the text.
 *
 * Rules it follows:
 *   - hidden on /rfq, where the form is already the page
 *   - appears only after the first screen, so the hero is not obscured
 *   - yields to the consent banner: both live at the bottom, and two stacked
 *     bars on a 640px-wide phone hides the very content the bar exists to sell
 *   - sits inside the safe-area inset on iPhones
 */
export default function MobileQuoteBar({ path = '/' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let consentOpen = false;
      try {
        consentOpen = !window.localStorage.getItem('tm-consent');
      } catch (e) {
        consentOpen = true;
      }
      setVisible(!consentOpen && window.scrollY > 520);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (path === '/rfq') return null;

  return (
    <div
      data-component="mobile-quote-bar"
      className={`fixed inset-x-0 bottom-0 z-[60] border-t border-brand-900/30 bg-brand-900/97 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur transition-transform duration-200 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-2">
        <a
          href="/rfq.html"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2.5 text-[13.5px] font-bold text-brand-900"
        >
          Send files for a quote
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
        <a
          href={waLink(DEFAULT_WA_TEXT)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ask on WhatsApp"
          className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border border-white/35 bg-white/10 text-white"
        >
          <MessageCircle className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

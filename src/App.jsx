import React, { useEffect, useReducer } from 'react';
import { subscribeContent } from './lib/content';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BoardMarquee from './components/BoardMarquee';
import Reveal from './components/Reveal';
import CoreServices from './components/CoreServices';
import ProcessFlow from './components/ProcessFlow';
import OrderModels from './components/OrderModels';
import ClosingCta from './components/ClosingCta';
import SolutionsSection from './components/SolutionsSection';
import AboutCompany from './components/AboutCompany';
import IndustryUseCases from './components/IndustryUseCases';
import Seo from './components/Seo';
import { resolveHead, canonicalFor } from './lib/head';
import FactoryGallery from './components/FactoryGallery';
import QualitySystem from './components/QualitySystem';
import PricingLogic from './components/PricingLogic';
import CaseStudies from './components/CaseStudies';
import RfqFunnel from './components/RfqFunnel';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CookieConsent from './components/CookieConsent';
import MobileQuoteBar from './components/MobileQuoteBar';
import { resolvePage, normalizePath } from './lib/routePage';
function HomePage() {
  return (
    <>
      <Hero />
      <BoardMarquee />
      <Reveal><CoreServices /></Reveal>
      <Reveal><IndustryUseCases /></Reveal>
      <Reveal><SolutionsSection /></Reveal>
      <Reveal><ProcessFlow /></Reveal>
      <Reveal><OrderModels /></Reveal>
      <Reveal><AboutCompany /></Reveal>
      <Reveal><FactoryGallery /></Reveal>
      <Reveal><QualitySystem /></Reveal>
      <Reveal><PricingLogic /></Reveal>
      <Reveal><CaseStudies /></Reveal>
      <Reveal><RfqFunnel /></Reveal>
      <Reveal><FaqSection /></Reveal>
      <Reveal><ClosingCta /></Reveal>
    </>
  );
}

/*
 * `page` is the component for this URL, and it is handed in rather than imported
 * here. That is the whole point of the split: this file, the header, the footer
 * and the homepage are what every visitor downloads, and the fourteen page
 * components are not part of it.
 *
 *   - the browser entry resolves the URL, fetches that one chunk and passes the
 *     component in (main.jsx);
 *   - the prerender passes the statically imported component instead, because
 *     renderToString cannot wait for a promise (entry-server.jsx).
 *
 * Both callers use resolvePage() to decide which name a URL is, so they cannot
 * disagree. Nothing in the page set can leak back into this bundle, because this
 * bundle no longer names any of them.
 */
export default function App({ path: pathProp, page = null }) {
  // content.json loads after first paint; bump to re-render with the overrides.
  const [, bumpContent] = useReducer((n) => n + 1, 0);
  useEffect(() => subscribeContent(bumpContent), []);

  const path = normalizePath(
    pathProp ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
  );
  const hash = typeof window !== 'undefined' ? window.location.hash : '';

  /* Which component this URL gets. The same function decides it in main.jsx, so
   * the browser knows which chunk to fetch before it mounts anything, and the two
   * can never disagree about what this URL is. */
  const { name: pageName, props: pageProps } = resolvePage(path, hash);
  /* Home needs no component from outside: its sections are already in this file. */
  const Page = pageName === 'Home' ? null : page;

  /* /applications wants no anchor jump: it has its own in-page tab handling. */
  const isApplications = pageName === 'ApplicationsPage';

  // Anchor links from the mega menu land under the sticky header otherwise.
  useEffect(() => {
    if (!hash || isApplications) return;
    const el = document.getElementById(hash.replace('#', ''));
    if (!el) return;
    const t = window.setTimeout(() => {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 118, behavior: 'smooth' });
    }, 120);
    return () => window.clearTimeout(t);
  }, [hash, isApplications]);

  // Keep the document head in step when a route changes without a full reload.
  useEffect(() => {
    const head = resolveHead(path);
    const url = canonicalFor(path);
    document.title = head.title;
    const set = (sel, attr, value) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute(attr, value);
    };
    set('meta[name="description"]', 'content', head.description);
    set('link[rel="canonical"]', 'href', url);
    set('meta[property="og:url"]', 'content', url);
    set('meta[property="og:title"]', 'content', head.ogTitle);
    set('meta[property="og:description"]', 'content', head.ogDescription);
  }, [path]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-brand-600 selection:text-white">

      <Seo path={path} />
      <ScrollProgress />
      <Navbar currentPath={path} />
      <main className="flex-1">
        {Page ? <Page {...pageProps} /> : <HomePage />}
      </main>
      <Footer />
      <MobileQuoteBar path={path} />
      <CookieConsent />
    </div>
  );
}

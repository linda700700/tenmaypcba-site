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
import { articleBySlug } from './lib/insights';
import FactoryGallery from './components/FactoryGallery';
import QualitySystem from './components/QualitySystem';
import PricingLogic from './components/PricingLogic';
import CaseStudies from './components/CaseStudies';
import RfqFunnel from './components/RfqFunnel';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CapabilitiesPage from './pages/CapabilitiesPage';
import AssemblyPage from './pages/AssemblyPage';
import ApplicationsPage from './pages/ApplicationsPage';
import InsightsPage from './pages/InsightsPage';
import ArticlePage from './pages/ArticlePage';

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

export default function App({ path: pathProp }) {
  // content.json loads after first paint; bump to re-render with the overrides.
  const [, bumpContent] = useReducer((n) => n + 1, 0);
  useEffect(() => subscribeContent(bumpContent), []);

  const path =
    (pathProp ?? (typeof window !== 'undefined' ? window.location.pathname : '/'))
      .replace(/\/+$/, '')
      .replace(/\.html$/, '') || '/';
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const isCapabilities = path === '/capabilities';
  const isAssembly = path === '/assembly';
  const isApplications = path === '/applications';
  const isInsights = path === '/insights';
  const articleSlug = path.startsWith('/insights/') ? path.slice('/insights/'.length) : null;
  const article = articleSlug ? articleBySlug(articleSlug) : null;

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

      <Seo />
      <ScrollProgress />
      <Navbar currentPath={path} />
      <main className="flex-1">
        {article ? (
          <ArticlePage article={article} />
        ) : isInsights ? (
          <InsightsPage />
        ) : isAssembly ? (
          <AssemblyPage />
        ) : isCapabilities ? (
          <CapabilitiesPage />
        ) : isApplications ? (
          <ApplicationsPage initialHash={hash} />
        ) : (
          <HomePage />
        )}
      </main>
      <Footer />
    </div>
  );
}

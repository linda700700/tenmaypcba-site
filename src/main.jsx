import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import { loadContent } from './lib/content';

// The prerendered markup exists for crawlers. The client takes over the
// container from there, so no hydration mismatch can ship to users.
// Not awaited: the compiled copy paints first, overrides land a moment later.
loadContent();

createRoot(document.getElementById('root')).render(
  <App path={window.location.pathname} />
);

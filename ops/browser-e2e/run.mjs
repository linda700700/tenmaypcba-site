/*
 * End-to-end check of the RFQ funnel with a real browser, from a public network.
 *
 * The earlier ops/browser-contract.sh replay proves the server accepts the exact
 * payload the form builds. It does not prove the page a visitor actually gets
 * can render the form and submit it — that needs a DOM, a click and React's
 * handler. This runs headless Chrome against the live site and asserts the
 * success panel, so a broken bundle or a thrown handler fails the check
 * instead of being discovered by a buyer.
 *
 * Runs on the GitHub runner, never on the workstation: the workstation's
 * egress is blocked for the API host, so a failure here would mean "my
 * network", not "the site".
 */
import puppeteer from 'puppeteer-core';

const STAMP = process.env.STAMP || new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
const SITE = process.env.SITE || 'https://tenmaypcba.com/';
const EMAIL = process.env.CHECK_EMAIL || 'check@tenmaypcba.com';
const COMPANY = `SAMPLE ROW - browser check ${STAMP} (safe to delete)`;

const results = [];
const check = (ok, label, detail = '') => {
  results.push({ ok, label, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}${detail ? ` — ${detail}` : ''}`);
};

const exe = process.env.CHROME_PATH;
if (!exe) {
  console.log('FAIL no chrome binary path');
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath: exe,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--window-size=1366,900'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });

  const consoleErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200));
  });
  page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${String(e).slice(0, 200)}`));

  let submitBody = null;
  let intakeStatus = null;
  let intakeBody = null;

  page.on('request', (r) => {
    if (r.method() === 'POST' && r.url().includes('/intake')) {
      submitBody = r.postData();
    }
  });
  page.on('response', async (r) => {
    if (r.url().includes('/intake')) {
      intakeStatus = r.status();
      try {
        intakeBody = (await r.text()).slice(0, 400);
      } catch {
        intakeBody = '(unreadable)';
      }
    }
  });

  const resp = await page.goto(SITE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  check(resp && resp.status() === 200, 'homepage answers 200', String(resp && resp.status()));

  // The form lives in the prerendered markup, so this only passes if the HTML
  // itself is intact; the click below is what needs the JavaScript bundle.
  await page.waitForSelector('#rfq input[name=email]', { timeout: 30000 });
  check(true, 'RFQ form is in the served HTML');

  // The honeypot only works if it is unreachable by a person. Assert that
  // rather than trusting the styling: an off-screen field that can still be
  // tabbed into is a way to lose real enquiries.
  const hp = await page.evaluate(() => {
    const el = document.querySelector('#rfq input[name=website]');
    if (!el) return { present: false };
    const r = el.getBoundingClientRect();
    el.focus();
    return {
      present: true,
      focused: document.activeElement === el,
      offscreen: r.right < 0 || r.bottom < 0 || r.width < 2 || r.height < 2,
      ariaHidden: el.closest('[aria-hidden="true"]') !== null,
      tabIndex: el.tabIndex,
    };
  });
  check(hp.present, 'honeypot field is in the form');
  check(hp.offscreen && hp.ariaHidden, 'honeypot is off-screen and hidden from assistive tech',
    JSON.stringify(hp));
  check(hp.tabIndex === -1 && !hp.focused, 'honeypot cannot take keyboard focus', JSON.stringify(hp));

  await page.$eval('#rfq', (el) => el.scrollIntoView({ block: 'center' }));
  await new Promise((r) => setTimeout(r, 800));

  // Exercise the optional controls the way a visitor would, so a broken
  // handler on them cannot hide behind a default value.
  const clickByText = async (text) =>
    page.$$eval(
      '#rfq button[type=button]',
      (nodes, want) => {
        const hit = nodes.find((n) => n.textContent.trim() === want);
        if (hit) hit.click();
        return Boolean(hit);
      },
      text
    );
  const qty = await clickByText('200');
  check(qty, 'quantity button 200 selectable');
  // The button's label is a two-line block ("Consigned Kit" + a subtitle), and
  // its text is CSS-uppercased in the built page, so match on a prefix rather
  // than the exact rendered string.
  const model = await page.$$eval(
    '#rfq button[type=button]',
    (nodes) => {
      const hit = nodes.find((n) => /consigned|kit/i.test(n.textContent));
      if (hit) hit.click();
      return Boolean(hit);
    }
  );
  check(model, 'procurement model button clickable');

  await page.type('#rfq input[name=email]', EMAIL);
  await page.type('#rfq input[name=company]', COMPANY);
  await page.type('#rfq textarea[name=notes]', 'Automated end-to-end check from the deploy pipeline. Safe to delete.');

  const emailValue = await page.$eval('#rfq input[name=email]', (el) => el.value);
  check(emailValue === EMAIL, 'typed email lands in the field', emailValue);
  const hpValue = await page.$eval('#rfq input[name=website]', (el) => el.value);
  check(hpValue === '', 'honeypot stayed empty for a real visitor', hpValue || '(empty)');

  await page.click('#rfq button[type=submit]');

  let succeeded = true;
  try {
    await page.waitForFunction(
      () => document.body.innerText.includes('Request received'),
      { timeout: 30000 }
    );
  } catch {
    succeeded = false;
  }
  check(succeeded, 'page shows "Request received" after the click');

  // innerText follows CSS text-transform, so the label comes back uppercased.
  const reference = await page.evaluate(() => {
    const m = document.body.innerText.match(/reference\s+(INQ-[0-9]+)/i);
    return m ? m[1] : '';
  });
  check(Boolean(reference), 'reference number rendered', reference);

  check(intakeStatus === 201, 'intake answered 201 to the browser', String(intakeStatus));
  check(
    Boolean(submitBody && submitBody.includes(COMPANY.replace(/\s+/g, ' ').slice(0, 20))),
    'submitted payload carries the typed company',
    submitBody ? submitBody.slice(0, 160) : 'no body captured'
  );
  if (intakeBody) console.log(`    intake body: ${intakeBody}`);

  const visibleError = await page.evaluate(() => {
    const el = document.querySelector('#rfq [role="alert"]');
    return el ? el.textContent.trim().slice(0, 160) : '';
  });
  check(!visibleError, 'no error banner shown', visibleError);

  check(
    consoleErrors.length === 0,
    'no console errors during the page load',
    consoleErrors.slice(0, 3).join(' | ')
  );

  await page.screenshot({ path: 'rfq-success.png', fullPage: false });
  console.log(`reference=${reference || 'none'}`);
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length === 0) {
  console.log('browser e2e complete: all checks passed');
  process.exit(0);
}
console.log('browser e2e failed');
process.exit(1);

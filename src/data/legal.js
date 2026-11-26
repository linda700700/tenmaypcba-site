/*
 * Every value the three legal pages depend on lives here, so changing the
 * contact address or the retention period is a one-line edit rather than a
 * search across three files.
 *
 * These pages describe what the site actually does today: a quote form that
 * posts to our inquiry intake, a one-time tokenised upload page for Gerber and
 * BOM, Google Analytics 4 behind a consent default of "denied", and no
 * advertising or cross-site tracking.
 * If any of that changes, this file and the cookie table are what to update.
 */

export const LEGAL = {
  // Shown at the top of all three pages. Bump it whenever the wording changes.
  updated: '24 November 2026',
  version: '1.1',

  // Single contact point for privacy requests, data questions and legal notices.
  // Must be a mailbox that actually receives: a privacy request sent to an
  // address nobody reads is a compliance defect, not a typo. If a dedicated
  // sales@ is created later, change this one line and the footer follows from
  // COMPANY.email separately.
  email: 'linda@tenmaypcba.com',

  // Months of inactivity after which a quote request is deleted.
  retentionMonths: 24,

  // Days after upload before a design file is deleted, unless it becomes part of
  // an order. This number is a promise made on the privacy page and enforced by
  // the sweep in ops/dataplane/server.js — keep the two in step. Changing one
  // without the other turns the policy into a false statement.
  uploadRetentionDays: 90,

  // Analytics retention as configured in the GA4 property (GA4 permits 2 or 14
  // months; 14 is the maximum and what the site is set to use).
  analyticsRetentionMonths: 14,

  // Terms of use. A Shenzhen-registered company contracting under PRC law is the
  // default; confirm with the company's legal adviser before publishing changes.
  law: 'the laws of the People\u2019s Republic of China',
  venue: 'the courts of Shenzhen, Guangdong, China',

  // The GA4 measurement ID is defined in index.html (one constant, GA_ID).
  gaMeasurementId: 'G-QSX2B7T8L',
};

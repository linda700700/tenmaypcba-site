import { SITE_URL } from './company';

/*
 * The one named person on the site.
 *
 * Everything here has to be true and attributable to a real employee: an
 * answer engine that finds a Person with no footprint behind the name trusts
 * the page less than one that names nobody. So this file stays small until
 * there is a second person who can actually stand behind the content.
 *
 * The @id is the join key. It is referenced from the Organization node
 * (`founder`) and from every Article (`author`), so all three resolve to the
 * same entity instead of three unrelated strings.
 */
export const FOUNDER = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#founder`,
  /* The Latin form leads because the site is English and this is the name on
   * the business card oversea buyers receive. The registered Chinese name is
   * carried as alternateName so registry and certificate checks still match. */
  name: 'Debin Qin',
  alternateName: ['秦德斌'],
  jobTitle: 'Founder',
  /* Twenty years in the trade, stated as the buyer would say it. No start year
   * is given because none was confirmed — a guessed date is worse than none.
   * The role is not repeated here: jobTitle says it, worksFor says where, and
   * the footer prints all three on one line. */
  description:
    'Twenty years in PCB assembly and electronics manufacturing.',
  worksFor: { '@id': `${SITE_URL}/#organization` },
  knowsAbout: [
    'PCB assembly',
    'SMT assembly',
    'Through-hole assembly',
    'Conformal coating',
    'Electronics manufacturing services',
  ],
};

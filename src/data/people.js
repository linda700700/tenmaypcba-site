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
  name: '秦德斌',
  jobTitle: 'Owner',
  /* Twenty years in the trade, stated as the buyer would say it. No start year
   * is given because none was confirmed — a guessed date is worse than none. */
  description:
    'Owner of Shenzhen Tenmay Technology. Twenty years in PCB assembly and electronics manufacturing in Shenzhen.',
  worksFor: { '@id': `${SITE_URL}/#organization` },
  knowsAbout: [
    'PCB assembly',
    'SMT assembly',
    'Through-hole assembly',
    'Conformal coating',
    'Electronics manufacturing services',
  ],
};

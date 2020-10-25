import { config } from '../config';

export function getPageTitle(
  suffix?: string,
  baseTitle = 'CodeMatters',
): string {
  if (typeof suffix === 'undefined') {
    return baseTitle;
  }

  return `${baseTitle} — ${suffix}`;
}

export function getPageURL(path: string) {
  const proto = config.env === 'development' ? 'http' : 'https';
  return `${proto}://${config.host}:${config.port}${path}`;
}

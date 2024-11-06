import { siteConfig } from "@/site-config";

export function getFormattedDate(date, options) {
  if (date === undefined) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat(siteConfig.date.locale, {
    ...siteConfig.date.options,
    ...options,
  }).format(date);
}

export function collectionDateSort(a, b) {
  return b.data.created.getTime() - a.data.created.getTime();
}

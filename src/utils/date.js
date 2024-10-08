import { siteConfig } from "@/site-config";

const dateFormat = new Intl.DateTimeFormat(siteConfig.date.locale, siteConfig.date.options);

export function getFormattedDate(date, options) {
  if (typeof options !== "undefined") {
    return date.toLocaleDateString(siteConfig.date.locale, {
      ...siteConfig.date.options,
      ...options,
    });
  }

  return dateFormat.format(date);
}

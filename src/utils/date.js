import { toZonedTime } from "date-fns-tz";
import { siteConfig } from "@/site-config";

const dateFormat = new Intl.DateTimeFormat(siteConfig.date.locale, siteConfig.date.options);

export function getFormattedDate(date, options) {
  if (typeof options !== "undefined") {
    return toZonedTime(date, siteConfig.timezone).toLocaleDateString(siteConfig.date.locale, {
      ...siteConfig.date.options,
      ...options,
    });
  }

  return dateFormat.format(toZonedTime(date, siteConfig.timezone));
}

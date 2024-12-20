import { atom } from "nanostores";
import { siteConfig } from "@/site.config";

export const pageMetadata = atom({description: siteConfig.description});

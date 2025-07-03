"use client";

import React, { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import useLangStore from "@/utils/useLangStore";
import { usePathname } from "next/navigation";

interface IntlProviderProps {
  children?: ReactNode;
}

const ONLY_ENGLISH_PAGES = ["/login", "/find-id", "/find-password"];

const NextIntlProvider = ({ children }: IntlProviderProps) => {
  const pathname = usePathname();

  const { lang: langState } = useLangStore();

  const lang = ONLY_ENGLISH_PAGES.includes(pathname) ? "en" : langState;

  console.log("lang :::", lang);

  const messages = require(`../../messages/${lang}.json`);

  return (
    <html lang={lang}>
      <NextIntlClientProvider messages={messages} locale={lang} timeZone="UTC">
        {children}
      </NextIntlClientProvider>
    </html>
  );
};

export default NextIntlProvider;

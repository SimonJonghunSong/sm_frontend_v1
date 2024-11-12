"use client";

import React, { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import useLangStore from "@/utils/useLangStore";

interface IntlProviderProps {
  children?: ReactNode;
}

const NextIntlProvider = ({ children }: IntlProviderProps) => {
  const { lang } = useLangStore();
  const messages = require(`../../messages/${lang}.json`);

  return (
    <html lang={lang}>
      <NextIntlClientProvider messages={messages} locale={lang}>
        {children}
      </NextIntlClientProvider>
    </html>
  );
};

export default NextIntlProvider;

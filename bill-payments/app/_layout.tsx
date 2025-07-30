// app/_layout.tsx or app/_layout.js

import React from "react";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "@/localization/i18n";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </I18nextProvider>
  );
}

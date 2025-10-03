"use client";

import { SectionComponent } from "@/components/section";

export default function ErrorPage() {
  return (
    <>
      <SectionComponent
        className={`p-8 text-center text-sm font-bold uppercase text-rose-500`}
      >
        Page not found
      </SectionComponent>
    </>
  );
}

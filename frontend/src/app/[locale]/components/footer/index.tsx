import { SectionComponent } from "@/components/section";

export const FooterComponent = () => (
  <div className="sticky top-[100svh] mt-[-1px] border-t border-t-border">
    <SectionComponent className="px-4 pb-4 pt-32">
      <div className="flex gap-2">
        <h1 className="text-lg font-semibold">Schild</h1>
        <span className="text-lg">urban people</span>
      </div>
    </SectionComponent>
    <div
      className={`
        flex w-full justify-center px-[var(--section-gap-width-xs)]

        sm:px-[var(--section-gap-width)]
      `}
    >
      <div
        className={`
          h-[var(--section-gap-width-xs)] w-full max-w-screen-2xl border-x
          border-x-border

          sm:h-[var(--section-gap-width)]
        `}
      />
    </div>
  </div>
);

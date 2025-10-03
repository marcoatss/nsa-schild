export interface Layout2x1RightStickyProps {
  nth1: React.ReactNode;
  nth2: React.ReactNode;
  nth1Dark?: boolean;
  nth2Dark?: boolean;
}

export const Layout2x1RightStickyComponent: React.FC<
  Layout2x1RightStickyProps
> = ({ nth1, nth2, nth1Dark, nth2Dark }: Layout2x1RightStickyProps) => {
  return (
    <div className="flex">
      <div
        className={`
          ${nth1Dark && "group-dark is-dark group bg-foreground"}

          basis-1/2 border-r border-r-border

          lg:basis-2/3
        `}
      >
        <div
          className={`
            sticky top-[var(--header-height)]

            sm:top-[var(--header-height)]
          `}
        >
          {nth1}
        </div>
      </div>
      <div
        className={`
          ${nth2Dark && "group-dark is-dark group bg-foreground"}

          basis-1/2

          lg:basis-1/3
        `}
      >
        <div
          className={`
            sticky top-[var(--header-xs-height)]

            sm:top-[var(--header-height)]
          `}
        >
          {nth2}
        </div>
      </div>
    </div>
  );
};

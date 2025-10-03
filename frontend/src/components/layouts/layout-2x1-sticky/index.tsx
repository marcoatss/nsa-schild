export interface Layout2x1StickyProps {
  nth1: React.ReactNode;
  nth2: React.ReactNode;
  nth1Dark?: boolean;
  nth2Dark?: boolean;
}

export const Layout2x1StickyComponent: React.FC<Layout2x1StickyProps> = ({
  nth1,
  nth2,
  nth1Dark,
  nth2Dark,
}: Layout2x1StickyProps) => {
  return (
    <div
      className={`
        flex flex-col

        md:min-h-[calc(100vh-var(--header-xs-height))] md:flex-row

        sm:min-h-[calc(100dvh-var(--header-height))]
      `}
    >
      <div
        className={`
          basis-1/2 border-b border-b-border

          md:border-b-0 md:border-r md:border-r-border
        `}
      >
        <div
          className={`
            ${nth1Dark && "group-dark is-dark group bg-foreground"}

            sticky top-[var(--header-xs-height)]

            sm:top-[var(--header-height)]
          `}
        >
          {nth1}
        </div>
      </div>
      <div className="basis-1/2">
        <div
          className={`
            ${nth2Dark && "group-dark is-dark group bg-foreground"}

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

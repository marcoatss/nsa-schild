export interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionComponent: React.FC<SectionProps> = ({
  children,
  className,
}: SectionProps) => {
  return (
    <div
      className={`
        flex w-full justify-center border-b border-b-border bg-background
        px-[var(--section-gap-width-xs)]

        sm:px-[var(--section-gap-width)]
      `}
    >
      <div
        className={`
          w-full max-w-screen-2xl border-x border-x-border

          ${className}
        `}
      >
        {children}
      </div>
    </div>
  );
};

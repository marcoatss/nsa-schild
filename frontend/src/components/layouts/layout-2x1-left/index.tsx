export interface Layout2x1LeftProps {
  nth1: React.ReactNode;
  nth2: React.ReactNode;
  nth1Dark?: boolean;
  nth2Dark?: boolean;
}

export const Layout2x1LeftComponent: React.FC<Layout2x1LeftProps> = ({
  nth1,
  nth2,
  nth1Dark,
  nth2Dark,
}: Layout2x1LeftProps) => {
  return (
    <div
      className={`
        flex flex-col

        md:flex-row
      `}
    >
      <div
        className={`
          ${nth1Dark && "group-dark is-dark group bg-foreground"}

          basis-1/2 border-b border-b-border

          lg:basis-1/3

          md:border-b-0 md:border-r md:border-r-border
        `}
      >
        {nth1}
      </div>
      <div
        className={`
          ${nth2Dark && "group-dark is-dark group bg-foreground"}

          basis-1/2

          lg:basis-2/3
        `}
      >
        {nth2}
      </div>
    </div>
  );
};

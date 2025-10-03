import { GridComponent, GridProps } from "@/components/grids/grid";

export interface Grid3x1Props {
  className?: string;
  cols?: GridProps["cols"];
  nth1?: React.ReactNode;
  nth2?: React.ReactNode;
  nth3?: React.ReactNode;
  nth1Dark?: boolean;
  nth2Dark?: boolean;
  nth3Dark?: boolean;
}

export const Grid3x1Component: React.FC<Grid3x1Props> = ({
  className,
  cols = 3,
  nth1,
  nth2,
  nth3,
  nth1Dark,
  nth2Dark,
  nth3Dark,
}: Grid3x1Props) => {
  return (
    <GridComponent cols={cols} className={className}>
      <div
        className={`
          ${nth1Dark && "group-dark is-dark group bg-foreground"}
        `}
      >
        {nth1}
      </div>
      <div
        className={`
          ${nth2Dark && "group-dark is-dark group bg-foreground"}
        `}
      >
        {nth2}
      </div>
      <div
        className={`
          ${nth3Dark && "group-dark is-dark group bg-foreground"}
        `}
      >
        {nth3}
      </div>
    </GridComponent>
  );
};

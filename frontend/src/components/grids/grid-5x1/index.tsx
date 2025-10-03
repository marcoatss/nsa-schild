import { GridComponent, GridProps } from "@/components/grids/grid";

export interface Grid5x1Props {
  className?: string;
  cols?: GridProps["cols"];
  nth1?: React.ReactNode;
  nth2?: React.ReactNode;
  nth3?: React.ReactNode;
  nth4?: React.ReactNode;
  nth5?: React.ReactNode;
  nth1Dark?: boolean;
  nth2Dark?: boolean;
  nth3Dark?: boolean;
  nth4Dark?: boolean;
  nth5Dark?: boolean;
}

export const Grid5x1Component: React.FC<Grid5x1Props> = ({
  className,
  cols = 5,
  nth1,
  nth2,
  nth3,
  nth4,
  nth5,
  nth1Dark,
  nth2Dark,
  nth3Dark,
  nth4Dark,
  nth5Dark,
}: Grid5x1Props) => {
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
      <div
        className={`
          ${nth4Dark && "group-dark is-dark group bg-foreground"}
        `}
      >
        {nth4}
      </div>
      <div
        className={`
          ${nth5Dark && "group-dark is-dark group bg-foreground"}
        `}
      >
        {nth5}
      </div>
    </GridComponent>
  );
};

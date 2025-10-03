import { GridComponent, GridProps } from "@/components/grids/grid";

export interface Grid3x3Props {
  className?: string;
  cols?: GridProps["cols"];
  nth1?: React.ReactNode;
  nth2?: React.ReactNode;
  nth3?: React.ReactNode;
  nth4?: React.ReactNode;
  nth5?: React.ReactNode;
  nth6?: React.ReactNode;
  nth7?: React.ReactNode;
  nth8?: React.ReactNode;
  nth9?: React.ReactNode;
  nth1Dark?: boolean;
  nth2Dark?: boolean;
  nth3Dark?: boolean;
  nth4Dark?: boolean;
  nth5Dark?: boolean;
  nth6Dark?: boolean;
  nth7Dark?: boolean;
  nth8Dark?: boolean;
  nth9Dark?: boolean;
}

export const Grid3x3Component: React.FC<Grid3x3Props> = ({
  className,
  cols = 3,
  nth1,
  nth2,
  nth3,
  nth4,
  nth5,
  nth6,
  nth7,
  nth8,
  nth9,
  nth1Dark,
  nth2Dark,
  nth3Dark,
  nth4Dark,
  nth5Dark,
  nth6Dark,
  nth7Dark,
  nth8Dark,
  nth9Dark,
}: Grid3x3Props) => {
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
      <div
        className={`
          ${nth6Dark && "group-dark is-dark group bg-foreground"}
        `}
      >
        {nth6}
      </div>
      <div
        className={`
          ${nth7Dark && "group-dark is-dark group bg-foreground"}
        `}
      >
        {nth7}
      </div>
      <div
        className={`
          ${nth8Dark && "group-dark is-dark group bg-foreground"}
        `}
      >
        {nth8}
      </div>
      <div
        className={`
          ${nth9Dark && "group-dark is-dark group bg-foreground"}
        `}
      >
        {nth9}
      </div>
    </GridComponent>
  );
};

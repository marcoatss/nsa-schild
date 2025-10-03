import { GridProps } from "@/components/grids/grid";
import { Grid3x1Component } from "@/components/grids/grid-3x1";

import { CMSGridNthComponent, CMSGridNthProps } from "../cms-grid-nth";

export interface CMSGrid3x1Props {
  className?: string;
  nth1: CMSGridNthProps | null;
  nth2: CMSGridNthProps | null;
  nth3: CMSGridNthProps | null;
  cols?: GridProps["cols"];
}

export const CMSGrid3x1Component: React.FC<CMSGrid3x1Props> = ({
  className,
  nth1,
  nth2,
  nth3,
  cols = 3,
}: CMSGrid3x1Props) => {
  return (
    <>
      <div
        className={`
          hidden

          md:block

          ${className}
        `}
      >
        <Grid3x1Component
          className="h-full"
          cols={cols}
          nth1={nth1 && <CMSGridNthComponent {...nth1} />}
          nth2={nth2 && <CMSGridNthComponent {...nth2} />}
          nth3={nth3 && <CMSGridNthComponent {...nth3} />}
        />
      </div>
      <div
        className={`
          md:hidden

          ${className}
        `}
      >
        <Grid3x1Component
          className="h-full"
          cols={1}
          nth1={nth1 && <CMSGridNthComponent {...nth1} />}
          nth2={nth2 && <CMSGridNthComponent {...nth2} />}
          nth3={nth3 && <CMSGridNthComponent {...nth3} />}
        />
      </div>
    </>
  );
};

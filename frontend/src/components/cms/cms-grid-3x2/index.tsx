import { GridProps } from "@/components/grids/grid";
import { Grid3x2Component } from "@/components/grids/grid-3x2";

import { CMSGridNthComponent, CMSGridNthProps } from "../cms-grid-nth";

export interface CMSGrid3x2Props {
  className?: string;
  nth1: CMSGridNthProps | null;
  nth2: CMSGridNthProps | null;
  nth3: CMSGridNthProps | null;
  nth4: CMSGridNthProps | null;
  nth5: CMSGridNthProps | null;
  nth6: CMSGridNthProps | null;
  cols?: GridProps["cols"];
}

export const CMSGrid3x2Component: React.FC<CMSGrid3x2Props> = ({
  className,
  nth1,
  nth2,
  nth3,
  nth4,
  nth5,
  nth6,
  cols = 3,
}: CMSGrid3x2Props) => {
  return (
    <Grid3x2Component
      className={className}
      nth1={nth1 && <CMSGridNthComponent {...nth1} />}
      nth2={nth2 && <CMSGridNthComponent {...nth2} />}
      nth3={nth3 && <CMSGridNthComponent {...nth3} />}
      nth4={nth4 && <CMSGridNthComponent {...nth4} />}
      nth5={nth5 && <CMSGridNthComponent {...nth5} />}
      nth6={nth6 && <CMSGridNthComponent {...nth6} />}
    />
  );
};

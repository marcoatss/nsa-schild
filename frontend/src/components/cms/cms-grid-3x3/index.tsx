import { GridProps } from "@/components/grids/grid";
import { Grid3x3Component } from "@/components/grids/grid-3x3";

import { CMSGridNthComponent, CMSGridNthProps } from "../cms-grid-nth";

export interface CMSGrid3x3Props {
  className?: string;
  cols?: GridProps["cols"];
  nth1: CMSGridNthProps | null;
  nth2: CMSGridNthProps | null;
  nth3: CMSGridNthProps | null;
  nth4: CMSGridNthProps | null;
  nth5: CMSGridNthProps | null;
  nth6: CMSGridNthProps | null;
  nth7: CMSGridNthProps | null;
  nth8: CMSGridNthProps | null;
  nth9: CMSGridNthProps | null;
}

export const CMSGrid3x3Component: React.FC<CMSGrid3x3Props> = ({
  className,
  cols,
  nth1,
  nth2,
  nth3,
  nth4,
  nth5,
  nth6,
  nth7,
  nth8,
  nth9,
}: CMSGrid3x3Props) => {
  return (
    <Grid3x3Component
      className={className}
      cols={cols}
      nth1={nth1 && <CMSGridNthComponent {...nth1} />}
      nth2={nth2 && <CMSGridNthComponent {...nth2} />}
      nth3={nth3 && <CMSGridNthComponent {...nth3} />}
      nth4={nth4 && <CMSGridNthComponent {...nth4} />}
      nth5={nth5 && <CMSGridNthComponent {...nth5} />}
      nth6={nth6 && <CMSGridNthComponent {...nth6} />}
      nth7={nth7 && <CMSGridNthComponent {...nth7} />}
      nth8={nth8 && <CMSGridNthComponent {...nth8} />}
      nth9={nth9 && <CMSGridNthComponent {...nth9} />}
    />
  );
};

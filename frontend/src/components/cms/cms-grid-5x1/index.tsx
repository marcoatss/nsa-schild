import { Grid5x1Component } from "@/components/grids/grid-5x1";

import { CMSGridNthComponent, CMSGridNthProps } from "../cms-grid-nth";

export interface CMSGrid5x1Props {
  className?: string;
  nth1: CMSGridNthProps | null;
  nth2: CMSGridNthProps | null;
  nth3: CMSGridNthProps | null;
  nth4: CMSGridNthProps | null;
  nth5: CMSGridNthProps | null;
}

export const CMSGrid5x1Component: React.FC<CMSGrid5x1Props> = ({
  className,
  nth1,
  nth2,
  nth3,
  nth4,
  nth5,
}: CMSGrid5x1Props) => {
  return (
    <Grid5x1Component
      className={className}
      nth1={nth1 && <CMSGridNthComponent {...nth1} />}
      nth2={nth2 && <CMSGridNthComponent {...nth2} />}
      nth3={nth3 && <CMSGridNthComponent {...nth3} />}
      nth4={nth4 && <CMSGridNthComponent {...nth4} />}
      nth5={nth5 && <CMSGridNthComponent {...nth5} />}
    />
  );
};

import { CMSGrid3x3Props } from "@/components/cms/cms-grid-3x3";
import { CMSTextParagraphComponent } from "@/components/cms/cms-text-paragraph";
import { CMSTextParagraphBigProps } from "@/components/cms/cms-text-paragraph-big";
import { Grid3x3Component } from "@/components/grids/grid-3x3";
import { Layout2x1LeftComponent } from "@/components/layouts/layout-2x1-left";
import { Layout2x1LeftStickyComponent } from "@/components/layouts/layout-2x1-left-sticky";
import { Layout2x1RightComponent } from "@/components/layouts/layout-2x1-right";
import { Layout2x1RightStickyComponent } from "@/components/layouts/layout-2x1-right-sticky";

import { CMSGridNthComponent } from "../cms-grid-nth";

export interface CMSGrid3x3SideProps {
  type: "right" | "left";
  dark: boolean;
  sticky: boolean;
  fullHeight: boolean;
  paragraph: CMSTextParagraphBigProps | null;
  grid: CMSGrid3x3Props | null;
}

export const CMSGrid3x3SideComponent: React.FC<CMSGrid3x3SideProps> = ({
  type,
  dark,
  sticky,
  paragraph,
  grid,
}: CMSGrid3x3SideProps) => {
  const paragraphComponent = (
    <>{paragraph && <CMSTextParagraphComponent {...paragraph} />}</>
  );

  const gridComponent = (
    <>
      {grid && (
        <>
          <div
            className={`
              hidden h-full

              lg:block
            `}
          >
            <Grid3x3Component
              className="h-full"
              cols={3}
              nth1={grid.nth1 && <CMSGridNthComponent {...grid.nth1} />}
              nth2={grid.nth2 && <CMSGridNthComponent {...grid.nth2} />}
              nth3={grid.nth3 && <CMSGridNthComponent {...grid.nth3} />}
              nth4={grid.nth4 && <CMSGridNthComponent {...grid.nth4} />}
              nth5={grid.nth5 && <CMSGridNthComponent {...grid.nth5} />}
              nth6={grid.nth6 && <CMSGridNthComponent {...grid.nth6} />}
              nth7={grid.nth7 && <CMSGridNthComponent {...grid.nth7} />}
              nth8={grid.nth8 && <CMSGridNthComponent {...grid.nth8} />}
              nth9={grid.nth9 && <CMSGridNthComponent {...grid.nth9} />}
            />
          </div>
          <div
            className={`
              h-full

              lg:hidden
            `}
          >
            <Grid3x3Component
              className="h-full"
              cols={3}
              nth1={grid.nth1 && <CMSGridNthComponent {...grid.nth1} />}
              nth2={grid.nth2 && <CMSGridNthComponent {...grid.nth2} />}
              nth3={grid.nth3 && <CMSGridNthComponent {...grid.nth3} />}
              nth4={grid.nth4 && <CMSGridNthComponent {...grid.nth4} />}
              nth5={grid.nth5 && <CMSGridNthComponent {...grid.nth5} />}
              nth6={grid.nth6 && <CMSGridNthComponent {...grid.nth6} />}
              nth7={grid.nth7 && <CMSGridNthComponent {...grid.nth7} />}
              nth8={grid.nth8 && <CMSGridNthComponent {...grid.nth8} />}
              nth9={grid.nth9 && <CMSGridNthComponent {...grid.nth9} />}
            />
          </div>
        </>
      )}
    </>
  );

  const nth1 = type === "left" ? paragraphComponent : gridComponent;
  const nth2 = type === "right" ? paragraphComponent : gridComponent;

  const nth1Dark = type === "left" && dark;
  const nth2Dark = type === "right" && dark;

  if (sticky) {
    if (type === "right") {
      return (
        <Layout2x1RightStickyComponent
          nth1={nth1}
          nth2={nth2}
          nth2Dark={nth2Dark}
        />
      );
    }

    return (
      <Layout2x1LeftStickyComponent
        nth1={nth1}
        nth2={nth2}
        nth1Dark={nth1Dark}
      />
    );
  }

  if (type === "right") {
    return (
      <Layout2x1RightComponent nth1={nth1} nth2={nth2} nth2Dark={nth2Dark} />
    );
  }

  return <Layout2x1LeftComponent nth1={nth1} nth2={nth2} nth1Dark={nth1Dark} />;
};

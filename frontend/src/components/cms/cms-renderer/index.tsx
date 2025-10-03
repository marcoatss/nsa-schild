import {
  CMSGrid3x1Component,
  CMSGrid3x1Props,
} from "@/components/cms/cms-grid-3x1";
import {
  CMSGrid3x1SideComponent,
  CMSGrid3x1SideProps,
} from "@/components/cms/cms-grid-3x1-side";
import {
  CMSGrid3x2Component,
  CMSGrid3x2Props,
} from "@/components/cms/cms-grid-3x2";
import {
  CMSGrid3x2SideComponent,
  CMSGrid3x2SideProps,
} from "@/components/cms/cms-grid-3x2-side";
import {
  CMSGrid3x3Component,
  CMSGrid3x3Props,
} from "@/components/cms/cms-grid-3x3";
import {
  CMSGrid3x3SideComponent,
  CMSGrid3x3SideProps,
} from "@/components/cms/cms-grid-3x3-side";
import {
  CMSGrid5x1Component,
  CMSGrid5x1Props,
} from "@/components/cms/cms-grid-5x1";
import { CMSHeroComponent, CMSHeroProps } from "@/components/cms/cms-hero";
import { SectionComponent } from "@/components/section";

export type CMSRendererBlock = (
  | CMSHeroProps
  | CMSGrid3x1Props
  | CMSGrid3x2Props
  | CMSGrid3x3Props
  | CMSGrid5x1Props
  | CMSGrid3x1SideProps
  | CMSGrid3x2SideProps
  | CMSGrid3x3SideProps
) & { id: string; __component: string };

export type CMSRendererContent = CMSRendererBlock[];

export interface CMSRendererProps {
  content: CMSRendererContent;
}

export const CMSRendererComponent: React.FC<CMSRendererProps> = ({
  content,
}: CMSRendererProps) => {
  return (
    <>
      {content.map((block) => (
        <SectionComponent key={block.id}>
          {block.__component === "content.hero" && (
            <CMSHeroComponent {...(block as CMSHeroProps)} />
          )}
          {block.__component === "content.grid-3x1" && (
            <CMSGrid3x1Component {...(block as CMSGrid3x1Props)} />
          )}
          {block.__component === "content.grid-3x2" && (
            <CMSGrid3x2Component {...(block as CMSGrid3x2Props)} />
          )}
          {block.__component === "content.grid-3x3" && (
            <CMSGrid3x3Component {...(block as CMSGrid3x3Props)} />
          )}
          {block.__component === "content.grid-5x1" && (
            <CMSGrid5x1Component {...(block as CMSGrid5x1Props)} />
          )}
          {block.__component === "content.grid-3x1-side" && (
            <CMSGrid3x1SideComponent {...(block as CMSGrid3x1SideProps)} />
          )}
          {block.__component === "content.grid-3x2-side" && (
            <CMSGrid3x2SideComponent {...(block as CMSGrid3x2SideProps)} />
          )}
          {block.__component === "content.grid-3x3-side" && (
            <CMSGrid3x3SideComponent {...(block as CMSGrid3x3SideProps)} />
          )}
        </SectionComponent>
      ))}
    </>
  );
};

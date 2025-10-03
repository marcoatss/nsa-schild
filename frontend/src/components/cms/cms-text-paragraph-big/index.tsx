import { TextParagraphBigComponent } from "@/components/texts/text-paragraph-big";

export interface CMSTextParagraphBigProps {
  content: string;
}

export const CMSTextParagraphBigComponent: React.FC<
  CMSTextParagraphBigProps
> = ({ content }: CMSTextParagraphBigProps) => (
  <div
    className={`
      px-8 py-10

      md:px-16 md:py-14
    `}
  >
    <TextParagraphBigComponent content={content} />
  </div>
);

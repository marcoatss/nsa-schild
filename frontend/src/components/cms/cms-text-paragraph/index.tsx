import { TextParagraphComponent } from "@/components/texts/text-paragraph";

export interface CMSTextParagraphProps {
  content: string;
}

export const CMSTextParagraphComponent: React.FC<CMSTextParagraphProps> = ({
  content,
}: CMSTextParagraphProps) => (
  <div className="p-8">
    <TextParagraphComponent content={content} />
  </div>
);

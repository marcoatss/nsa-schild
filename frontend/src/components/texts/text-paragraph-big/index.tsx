import style from "./style.module.css";

export interface TextParagraphBigProps {
  content: string;
}

export const TextParagraphBigComponent: React.FC<TextParagraphBigProps> = ({
  content,
}: TextParagraphBigProps) => {
  if (!content) return null;
  
  return (
    <div
      className={style.paragraph}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

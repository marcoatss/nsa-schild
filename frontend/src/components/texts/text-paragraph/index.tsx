import style from "./style.module.css";

export interface TextParagraphProps {
  content: string;
}

export const TextParagraphComponent: React.FC<TextParagraphProps> = ({
  content,
}: TextParagraphProps) => (
  <div
    className={style.paragraph}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

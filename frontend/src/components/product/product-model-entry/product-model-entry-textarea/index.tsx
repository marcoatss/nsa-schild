import { TextareaComponent } from "@/components/textarea";

export interface ProductModelEntryTextareaProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const ProductModelEntryTextareaComponent: React.FC<
  ProductModelEntryTextareaProps
> = ({ value, placeholder, onChange }: ProductModelEntryTextareaProps) => {
  return (
    <TextareaComponent
      className="w-full"
      placeholder={placeholder}
      value={value}
      onChange={(val) => onChange(val.target.value)}
    />
  );
};

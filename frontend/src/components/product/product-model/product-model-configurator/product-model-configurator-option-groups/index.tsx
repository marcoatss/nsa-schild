import { LabelComponent } from "@/components/label";
import {
  RadioGroupComponent,
  RadioGroupItemComponent,
} from "@/components/radio-group";
import { ProductModel, ProductModelOption } from "@/lib/types";

export interface ProductModelConfiguratorOptionGroupsProps {
  categorySlug: string;
  subcategorySlug: string;
  productSlug: string;
  productModel: ProductModel;
  availableOptions: ProductModelOption[];
  selectedOptions: { name: string; value: string | null }[];
  warnings: { [name: string]: boolean };
  onChange: (name: string, value: string) => void;
}

export const ProductModelConfiguratorOptionGroupsComponent: React.FC<
  ProductModelConfiguratorOptionGroupsProps
> = ({
  categorySlug,
  subcategorySlug,
  productSlug,
  productModel,
  availableOptions,
  selectedOptions,
  warnings,
  onChange,
}: ProductModelConfiguratorOptionGroupsProps) => {
  return (
    <div className="flex flex-col gap-6">
      {availableOptions.map(({ name, values }) => (
        <div key={name}>
          <h1
            className={`
              mb-3 text-sm font-bold uppercase

              ${warnings[name] && `text-red-600`}
            `}
          >
            {name}
          </h1>
          <RadioGroupComponent
            className={`
              border-l border-l-border pl-4

              ${warnings[name] && `border-l-red-600 text-red-600`}
            `}
          >
            {values.map((value, optionIndex) => {
              const key = `${categorySlug}-${subcategorySlug}-${productSlug}-${productModel.id}-${name}-${optionIndex}`;

              const checked =
                selectedOptions?.find(
                  ({ name: currentName }) => name === currentName,
                )?.value === value;

              return (
                <div className="flex items-center" key={optionIndex}>
                  <RadioGroupItemComponent
                    id={key}
                    value={value}
                    checked={checked}
                    className={`
                      ${warnings[name] && "border-red-600"}
                    `}
                    onClick={() => onChange(name, value)}
                  />
                  <LabelComponent
                    htmlFor={key}
                    className="w-full cursor-pointer pb-1 pl-2 pt-1"
                  >
                    {value}
                  </LabelComponent>
                </div>
              );
            })}
          </RadioGroupComponent>
        </div>
      ))}
    </div>
  );
};

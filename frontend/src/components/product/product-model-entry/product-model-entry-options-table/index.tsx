import { useMemo } from "react";

import {
  SelectComponent,
  SelectContentComponent,
  SelectGroupComponent,
  SelectItemComponent,
  SelectTriggerComponent,
  SelectValueComponent,
} from "@/components/select";
import { ProductModelOption } from "@/lib/types";

export interface ProductModelEntryOptionsTableProps {
  availableOptions: ProductModelOption[];
  selectedOptions: { name: string; value: string }[];
  onOptionChange: (name: string, value: string) => void;
}

export const ProductModelEntryOptionsTableComponent: React.FC<
  ProductModelEntryOptionsTableProps
> = ({
  onOptionChange,
  availableOptions,
  selectedOptions,
}: ProductModelEntryOptionsTableProps) => {
  const options = useMemo<
    {
      name: string;
      values: string[];
      selectedValue?: string;
    }[]
  >(
    () =>
      availableOptions.map(({ name, values }) => ({
        name,
        values,
        selectedValue: selectedOptions.find(
          (selectedOption) => selectedOption.name === name,
        )?.value,
      })),
    [availableOptions, selectedOptions],
  );

  return (
    <table className="w-full table-auto border-collapse">
      <tbody>
        {options.map(({ name, values, selectedValue }, index) => (
          <tr
            key={index}
            className={`
              border-b border-b-border-light

              odd:bg-foreground/10
            `}
          >
            <td
              className={`
                border-r border-r-border-light px-4 py-2 text-sm font-medium
              `}
            >
              {name}
            </td>
            <td className="p-1 text-right text-sm font-semibold">
              <SelectComponent
                value={selectedValue}
                onValueChange={(value) => onOptionChange(name, value)}
              >
                <SelectTriggerComponent>
                  <SelectValueComponent />
                </SelectTriggerComponent>
                <SelectContentComponent>
                  <SelectGroupComponent>
                    {values.map((value) => (
                      <SelectItemComponent key={value} value={value}>
                        {value}
                      </SelectItemComponent>
                    ))}
                  </SelectGroupComponent>
                </SelectContentComponent>
              </SelectComponent>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

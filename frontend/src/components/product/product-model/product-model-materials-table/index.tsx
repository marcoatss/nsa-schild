import { useTranslations } from "next-intl";

import { ProductModelMaterial } from "@/lib/types";

export interface ProductModelMaterialsTableProps {
  materials: ProductModelMaterial[];
}

export const ProductModelMaterialsTableComponent: React.FC<
  ProductModelMaterialsTableProps
> = ({ materials }: ProductModelMaterialsTableProps) => {
  const t = useTranslations("page_product");

  const table = materials.map(({ name, percentage }) => [
    name,
    percentage ?? "-",
    percentage && "%",
  ]);

  return (
    <>
      <h1
        className={`
          border-y border-y-border-light p-4 text-sm font-bold uppercase
        `}
      >
        {t("model_materials")}
      </h1>
      <table className="w-full table-auto border-collapse">
        <tbody>
          {table.map(([key, value, unit]) => (
            <tr
              key={key}
              className={`
                border-b border-b-border-light

                odd:bg-foreground/10
              `}
            >
              <td className="border-r border-r-border-light px-4 py-2">
                <h1 className="text-sm font-medium">{key}</h1>
              </td>
              <td className="px-4 py-2 pr-0 text-right text-sm font-bold">
                {value}
              </td>
              <td className="w-[1%] px-4 py-2 pl-1 text-left text-sm font-medium">
                {unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

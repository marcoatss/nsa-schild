import { Workbook, Worksheet } from "exceljs";
import { Strapi } from '@strapi/strapi';

const rowColors = ["E0ECF6", "B6CEE2"];

const drawQuoteHeader = (
  worksheet: Worksheet,
  rowIndex: number,
  id?: number,
  createdAt?: string,
  language?: string,
  firstName?: string,
  lastName?: string,
  company?: string,
  address?: string,
  postalCode?: string,
  email?: string,
  phone?: string,
  note?: string,
): number => {
  const date = new Date(createdAt ?? "").toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  const header = [
    ["ID", id],
    ["Language", language],
    ["Date", date],
    ["First Name", firstName],
    ["Last Name", lastName],
    ["Company", company],
    ["Address", address],
    ["Postal Code", postalCode],
    ["Email", email],
    ["Phone", phone],
    ["Note", note],
  ];

  header.forEach(([title, value]) => {
    const row = worksheet.getRow(rowIndex);

    const titleCell = row.getCell(1);
    const valueCell = row.getCell(2);

    titleCell.value = title;
    valueCell.value = value;

    titleCell.font = {
      bold: true,
      color: { argb: "FFFFFF" }
    };

    titleCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1E517B" },
    };

    valueCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: rowColors[rowIndex % 2] },
    };

    rowIndex += 1;
  });

  return rowIndex;
};

const drawProductsTableHeader = (worksheet: Worksheet, rowIndex: number): number => {
  const header = [
    "ID",
    "Category",
    "Subcategory",
    "Product",
    "Model",
    "Supplier",
    "Code",
    "Options",
    "",
    "Notes",
  ];

  const row = worksheet.getRow(rowIndex);

  rowIndex += 1;

  header.forEach((title, index) => {
    const cell = row.getCell(index + 1);

    cell.value = title;

    cell.font = {
      bold: true,
      color: { argb: "FFFFFF" }
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1E517B" },
    };
  });

  return rowIndex;
};

export default () => ({
  exportToExcel: async ({ data }: {
    data: {
      id?: number;
      createdAt?: string;
      language?: string;
      firstName?: string;
      lastName?: string;
      company?: string;
      address?: string;
      postalCode?: string;
      email?: string;
      phone?: string;
      note?: string;
      entries?: {
        id?: number;
        category?: string;
        subcategory?: string;
        product?: string;
        model?: string;
        supplier?: string;
        code?: string;
        notes?: string;
        options?: {
          id?: number;
          name?: string;
          value?: string;
        }[];
      }[];
    },
  }) => {
    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet(`Quote ${data.id}`, {
      pageSetup: {
        paperSize: 9,
        orientation: 'landscape',
      },
    });

    let rowIndex = 1;

    rowIndex = drawQuoteHeader(
      worksheet,
      rowIndex,
      data.id,
      data.createdAt,
      data.language,
      data.firstName,
      data.lastName,
      data.company,
      data.address,
      data.postalCode,
      data.email,
      data.phone,
      data.note,
    );

    rowIndex += 1;

    rowIndex = drawProductsTableHeader(worksheet, rowIndex);

    data.entries?.forEach(({ category, subcategory, product, model, supplier, code, notes, options }, index) => {
      const row = worksheet.getRow(rowIndex);

      row.values = [
        index + 1,
        category,
        subcategory,
        product,
        model,
        supplier,
        code,
        "",
        "",
        notes,
      ];

      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: rowColors[rowIndex % 2] },
        };
      });

      options?.forEach(({ name, value }) => {
        const row = worksheet.getRow(rowIndex);

        const titleCell = row.getCell(8);
        const valueCell = row.getCell(9);

        titleCell.value = name;
        valueCell.value = value;

        rowIndex += 1;

        titleCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: rowColors[rowIndex % 2] },
        };

        valueCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: rowColors[rowIndex % 2] },
        };
      });
    });

    worksheet.columns.forEach((col) => {
      const lengths = col?.values?.map((v) => v?.toString()?.length ?? 0) ?? [];
      const maxLength = Math.max(...lengths.filter(Number), 10);

      col.width = maxLength;
    });

    return await workbook.xlsx.writeBuffer();
  },
});

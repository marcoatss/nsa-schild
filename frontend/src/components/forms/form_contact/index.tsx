"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCallback, useState } from "react";

import { ButtonComponent } from "@/components/button";
import { CheckboxComponent } from "@/components/checkbox";
import { InputComponent } from "@/components/input";
import { TextareaComponent } from "@/components/textarea";
import { queryPostQuote } from "@/lib/query-post-quote.helper";
import { WishlistEntries } from "@/lib/types";

export interface FormContactProps {
  entries?: WishlistEntries;
  disabled?: boolean;
}

export const FormContactComponent: React.FC<FormContactProps> = ({
  entries,
  disabled,
}: FormContactProps) => {
  const t = useTranslations("page_about");

  const locale = useLocale();

  /***************************/
  /********** STATE **********/
  /***************************/

  const [warnings, setWarnings] = useState<{
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    postalCode: boolean;
    policy: boolean;
  }>({
    firstName: false,
    lastName: false,
    email: false,
    postalCode: false,
    policy: false,
  });

  const [form, setForm] = useState<{
    firstName: string | null;
    lastName: string | null;
    company: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    postalCode: string | null;
    notes: string | null;
    policy: boolean;
  }>({
    firstName: null,
    lastName: null,
    company: null,
    email: null,
    phone: null,
    address: null,
    postalCode: null,
    notes: null,
    policy: false,
  });

  /*******************************/
  /********** CALLBACKS **********/
  /*******************************/

  const handleChange = useCallback((key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setWarnings((prev) => ({ ...prev, [key]: false }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const nextWarnings = {
      firstName: !form.firstName,
      lastName: !form.lastName,
      email: !form.email,
      postalCode: !form.postalCode,
      policy: !form.policy,
    };

    setWarnings(nextWarnings);

    const submittable = Object.values(nextWarnings).every(
      (warning) => warning === false,
    );

    if (submittable) {
      queryPostQuote({
        language: locale,
        firstName: form.firstName!,
        lastName: form.lastName!,
        company: form.company,
        email: form.email!,
        phone: form.phone,
        address: form.address,
        postalCode: form.postalCode!,
        notes: form.notes,
        entries:
          entries?.map(({ entry, product }) => ({
            category: product.category.name,
            subcategory: product.subcategory.name,
            product: product.name,
            model: entry.productModel.name,
            count: entry.count,
            notes: entry.notes,
            options: entry.options,
          })) ?? [],
      });
    }
  }, [form, entries, locale]);

  return (
    <>
      <div className="mb-4 grid grid-cols-3 gap-4">
        <InputComponent
          type="text"
          placeholder={t("about_form_first_name")}
          className={`
            ${
              warnings.firstName &&
              `border-red-600 text-red-600 !placeholder-red-400`
            }
          `}
          value={form.firstName ?? ""}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <InputComponent
          type="text"
          placeholder={t("about_form_last_name")}
          className={`
            ${
              warnings.lastName &&
              `border-red-600 text-red-600 !placeholder-red-400`
            }
          `}
          value={form.lastName ?? ""}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        <InputComponent
          type="text"
          placeholder={t("about_form_company")}
          value={form.company ?? ""}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <InputComponent
          type="text"
          className={`
            ${
              warnings.email &&
              `border-red-600 text-red-600 !placeholder-red-400`
            }
          `}
          placeholder={t("about_form_email")}
          value={form.email ?? ""}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <InputComponent
          type="text"
          placeholder={t("about_form_phone")}
          value={form.phone ?? ""}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <InputComponent
          type="text"
          placeholder={t("about_form_address")}
          value={form.address ?? ""}
          onChange={(e) => handleChange("address", e.target.value)}
        />
        <InputComponent
          type="text"
          className={`
            ${
              warnings.postalCode &&
              `border-red-600 text-red-600 !placeholder-red-400`
            }
          `}
          placeholder={t("about_form_postal_code")}
          value={form.postalCode ?? ""}
          onChange={(e) => handleChange("postalCode", e.target.value)}
        />
      </div>
      <TextareaComponent
        placeholder={t("about_form_notes")}
        className="mb-8"
        value={form.notes ?? ""}
        onChange={(e) => handleChange("notes", e.target.value)}
      />
      <div className="flex justify-between">
        <div className="items-top flex space-x-2">
          <CheckboxComponent
            id="policy"
            checked={form.policy}
            onCheckedChange={(checked) => handleChange("policy", checked)}
            className={`
              ${warnings.policy && "border-red-600"}
            `}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="policy"
              className={`
                select-none text-sm font-medium leading-none

                peer-disabled:cursor-not-allowed peer-disabled:opacity-70

                ${warnings.policy && `text-red-600`}
              `}
            >
              {t("about_form_policy")}
            </label>
            <p
              className={`
                select-none text-sm text-muted-foreground

                ${warnings.policy && `text-red-400`}
              `}
            >
              {t("about_form_policy_description")}
            </p>
          </div>
        </div>
        <ButtonComponent
          variant="accent"
          disabled={disabled}
          onClick={handleSubmit}
        >
          {t("about_form_submit")}
        </ButtonComponent>
      </div>
    </>
  );
};

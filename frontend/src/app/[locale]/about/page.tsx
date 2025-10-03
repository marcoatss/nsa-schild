import EnvelopeIcon from "@heroicons/react/24/outline/EnvelopeIcon";
import PhoneIcon from "@heroicons/react/24/outline/PhoneIcon";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { stringify } from "qs";

import { ImageFullHeightComponent } from "@/components/images/image-full-height";
import { SectionComponent } from "@/components/section";
import { mapImage } from "@/lib/map-image.helper";

import { AboutPageFormContactComponent } from "./components/form_contact.component";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations("page_about");

  const { image } = await getData(locale);

  return (
    <>
      <SectionComponent className="p-14">
        <h1 className="w-full text-center text-6xl font-black">{t("about")}</h1>
      </SectionComponent>
      <SectionComponent>
        <div
          className={`
            flex flex-col

            lg:flex-row
          `}
        >
          <div
            className={`
              basis-1/2 border-b border-b-border

              lg:border-b-0 lg:border-r lg:border-r-border
            `}
          >
            <ImageFullHeightComponent image={image} size="large" />
          </div>
          <div className="flex basis-1/2 flex-col gap-6 px-14 py-14">
            <span className="text-sm font-bold uppercase">
              {t("about_title")}
            </span>
            <p className="text-xl">{t("about_description")}</p>
          </div>
        </div>
      </SectionComponent>
      <SectionComponent>
        <div
          className={`
            flex flex-col

            lg:flex-row
          `}
        >
          <div
            className={`
              flex basis-1/2 items-center justify-center bg-foreground p-8
            `}
          >
            <div className="grid w-full grid-rows-3 text-white">
              <div className="grid grid-cols-2 border-b border-b-border-light">
                <div
                  className={`
                    border-r border-r-border-light p-8 text-sm font-bold
                    uppercase
                  `}
                >
                  {t("about_informations")}
                </div>
                <div className="flex flex-col gap-4 p-8">
                  <div className="flex items-center gap-6">
                    <PhoneIcon className="h-5 w-5" />
                    <span className="text-base font-medium">
                      {t("about_informations_phone")}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <EnvelopeIcon className="h-5 w-5" />
                    <span className="text-base font-medium">
                      {t("about_informations_email")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 border-b border-b-border-light">
                <div
                  className={`
                    border-r border-r-border-light p-8 text-sm font-bold
                    uppercase
                  `}
                >
                  {t("about_administration")}
                </div>
                <div className="flex flex-col gap-4 p-8">
                  <div className="flex items-center gap-6">
                    <PhoneIcon className="h-5 w-5" />
                    <span className="text-base font-medium">
                      {t("about_administration_phone")}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <EnvelopeIcon className="h-5 w-5" />
                    <span className="text-base font-medium">
                      {t("about_administration_email")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div
                  className={`
                    border-r border-r-border-light p-8 text-sm font-bold
                    uppercase
                  `}
                >
                  {t("about_secretary")}
                </div>
                <div className="flex flex-col gap-4 p-8">
                  <div className="flex items-center gap-6">
                    <PhoneIcon className="h-5 w-5" />
                    <span className="text-base font-medium">
                      {t("about_secretary_phone")}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <EnvelopeIcon className="h-5 w-5" />
                    <span className="text-base font-medium">
                      {t("about_secretary_email")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex basis-1/2 flex-col px-14 py-14">
            <span className="mb-8 text-sm font-bold uppercase">
              {t("about_form_title")}
            </span>
            <AboutPageFormContactComponent />
          </div>
        </div>
      </SectionComponent>
    </>
  );
}

async function getData(locale: string) {
  const query = stringify({ locale, populate: "deep" });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/about?${query}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const {
    data: {
      attributes: {
        media: { data },
      },
    },
  } = await res.json();

  const image = data ? mapImage(data) : null;

  return { image };
}

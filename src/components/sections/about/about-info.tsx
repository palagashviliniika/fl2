import { getTranslations } from "next-intl/server";

const PRINCIPLES = ["authority", "efficiency", "quality"] as const;

export async function AboutInfo() {
  const t = await getTranslations("about.info");

  return (
    <section className="bg-light">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-20 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <h1 className="text-xl font-extrabold uppercase tracking-wide text-text lg:text-[32px] lg:leading-tight">
              {t("heading")}
            </h1>
            <p className="text-base font-semibold text-text lg:text-2xl">
              {t("subtitle")}
            </p>
            <p className="text-base leading-relaxed text-text/70 lg:text-lg">
              {t("body")}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-base font-semibold text-text lg:text-lg">
              {t("principlesHeading")}
            </p>
            <div className="flex flex-col gap-4">
              {PRINCIPLES.map((key) => (
                <div
                  key={key}
                  className="border-l border-brown/50 pl-5 py-2"
                >
                  <p className="text-base font-semibold text-text lg:text-lg">
                    {t(`principles.${key}.title`)}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-text/70 lg:text-base">
                    {t(`principles.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

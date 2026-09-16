"use client";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/LocaleContext";
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  return (
    <PageContainer className="py-20 text-center">
      <h1 className="text-2xl font-bold">{t("errors.page")}</h1>
      <p className="my-4 text-muted-foreground">
        {t("errors.retryDescription")}
      </p>
      <Button onPress={reset}>{t("common.retry")}</Button>
    </PageContainer>
  );
}

"use client";
import { useI18n } from "@/context/LocaleContext";
import type { ComponentProps } from "react";

export default function LocalizedForm({
  onInvalidCapture,
  onInputCapture,
  ...props
}: ComponentProps<"form">) {
  const { t } = useI18n();
  return (
    <form
      {...props}
      onInvalidCapture={(event) => {
        const field = event.target;
        if (
          field instanceof HTMLInputElement ||
          field instanceof HTMLTextAreaElement ||
          field instanceof HTMLSelectElement
        ) {
          const validity = field.validity;
          const message = validity.valueMissing
            ? t("validation.required")
            : validity.typeMismatch
              ? t("validation.email")
              : validity.patternMismatch
                ? t("form.phoneHint")
                : validity.tooShort && "minLength" in field
                  ? t("validation.minLength", { min: field.minLength })
                  : t("validation.invalid");
          field.setCustomValidity(message);
        }
        onInvalidCapture?.(event);
      }}
      onInputCapture={(event) => {
        const field = event.target;
        if (
          field instanceof HTMLInputElement ||
          field instanceof HTMLTextAreaElement ||
          field instanceof HTMLSelectElement
        )
          field.setCustomValidity("");
        onInputCapture?.(event);
      }}
    />
  );
}

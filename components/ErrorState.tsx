"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useI18n } from "@/context/LocaleContext";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message: string;
}

export default function ErrorState({ title, message }: ErrorStateProps) {
  const { t, translateMessage } = useI18n();

  return (
    <div className="py-8">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <div>
          <AlertDescription className="font-semibold">
            {title ?? t("errors.title")}
          </AlertDescription>
          <AlertDescription className="mt-1 text-xs">
            {translateMessage(message)}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}

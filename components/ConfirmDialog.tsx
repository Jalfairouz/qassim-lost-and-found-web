"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useI18n } from "@/context/LocaleContext";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  isDestructive = false,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { t } = useI18n();

  return (
    <AlertDialog
      isOpen={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && !isLoading) onCancel();
      }}
    >
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel isDisabled={isLoading} onPress={onCancel}>
          {cancelLabel ?? t("common.cancel")}
        </AlertDialogCancel>
        <AlertDialogAction
          slot={undefined}
          onPress={onConfirm}
          isDisabled={isLoading}
          className={
            isDestructive
              ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              : ""
          }
        >
          {isLoading ? t("common.wait") : (confirmLabel ?? t("common.confirm"))}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>
  );
}

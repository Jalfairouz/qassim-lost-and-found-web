"use client";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/context/LocaleContext";
import { PostType } from "@/types";
import { HandHeart, Search } from "lucide-react";
export default function ReportTypeBadge({
  type,
  size = "md",
}: {
  type: PostType;
  size?: "sm" | "md";
}) {
  const { t } = useI18n();
  const Icon = type === "Lost" ? Search : HandHeart;
  return (
    <Badge
      className={
        (type === "Lost"
          ? "bg-orange-soft text-orange"
          : "bg-teal-soft text-teal") +
        " gap-1.5 border-0 " +
        (size === "sm" ? "text-xs" : "text-sm")
      }
    >
      <Icon aria-hidden className="size-3" />
      {t(type === "Lost" ? "report.lost" : "report.found")}
    </Badge>
  );
}

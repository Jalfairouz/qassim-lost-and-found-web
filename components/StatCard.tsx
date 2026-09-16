"use client";
import { useI18n } from "@/context/LocaleContext";
import { ClipboardList, HandHeart, MapPin, Search, Users } from "lucide-react";
const icons = { Search, HandHeart, ClipboardList, MapPin, Users };
export default function StatCard({
  label,
  value,
  icon,
  tone = "brand",
  description,
}: {
  label: string;
  value: number;
  icon: keyof typeof icons;
  tone?: "brand" | "orange" | "teal";
  description: string;
}) {
  const { number, translateMessage } = useI18n();
  const Icon = icons[icon];
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl border bg-card p-5 shadow-sm">
      <div>
        <p className="text-sm text-muted-foreground">
          {translateMessage(label)}
        </p>
        <p className="my-1 text-3xl font-bold tabular-nums">{number(value)}</p>
        <p className="text-xs text-muted-foreground">
          {translateMessage(description)}
        </p>
      </div>
      <span
        className={
          "rounded-xl p-3 " +
          {
            brand: "bg-secondary text-primary",
            orange: "bg-orange-soft text-orange",
            teal: "bg-teal-soft text-teal",
          }[tone]
        }
      >
        <Icon aria-hidden className="size-5" />
      </span>
    </div>
  );
}

"use client";
import LocalizedForm from "@/components/LocalizedForm";
import { useI18n } from "@/context/LocaleContext";
import { getColleges } from "@/lib/api";
import { College, CreatePostInput, PostType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface PostFormProps {
  initialValues?: CreatePostInput;
  onSubmit: (values: CreatePostInput) => Promise<void>;
  submitLabel: string;
}

const emptyValues: CreatePostInput = {
  title: "",
  description: "",
  type: "Lost",
  collegeId: 0,
  contactNumber: "",
};

export default function PostForm({
  initialValues,
  onSubmit,
  submitLabel,
}: PostFormProps) {
  const { t, college, translateMessage, errorText } = useI18n();

  const router = useRouter();
  const [colleges, setColleges] = useState<College[]>([]);
  const [values, setValues] = useState<CreatePostInput>(
    initialValues ?? emptyValues,
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getColleges()
      .then(setColleges)
      .catch(() => setError(t("errors.colleges")));
  }, [t]);

  function update<K extends keyof CreatePostInput>(
    key: K,
    value: CreatePostInput[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (values.collegeId === 0) {
      setError(t("validation.college"));
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      setError(errorText(err, "errors.generic"));
      setSubmitting(false);
    }
  }

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-7 border-b pb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">
            {t("form.eyebrow")}
          </p>
          <h2 className="mt-2 text-xl font-semibold">{t("form.title")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("form.description")}
          </p>
        </div>
        <LocalizedForm onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <p id="item-type-label" className="text-sm font-semibold">
              {t("report.type")}
            </p>
            <div
              role="group"
              aria-labelledby="item-type-label"
              className="grid grid-cols-2 gap-3"
            >
              {(["Lost", "Found"] as PostType[]).map((itemType) => (
                <Button
                  type="button"
                  key={itemType}
                  aria-pressed={values.type === itemType}
                  isDisabled={submitting}
                  variant={values.type === itemType ? "default" : "outline"}
                  onClick={() => update("type", itemType)}
                  className={
                    values.type === itemType
                      ? itemType === "Lost"
                        ? "h-16 rounded-xl border-orange bg-orange-soft text-orange hover:bg-orange-soft"
                        : "h-16 rounded-xl border-teal bg-teal-soft text-teal hover:bg-teal-soft"
                      : "h-16 rounded-xl"
                  }
                >
                  {itemType === "Lost" ? t("form.lost") : t("form.found")}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="title">{t("form.itemTitle")}</Label>
            <Input
              id="title"
              dir="auto"
              required
              maxLength={100}
              value={values.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder={t("form.titlePlaceholder")}
              disabled={submitting}
            />
            <p className="text-xs text-muted-foreground">
              {t("form.counter", { count: values.title.length, max: 100 })}
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description">{t("form.details")}</Label>
            <Textarea
              id="description"
              dir="auto"
              required
              maxLength={1000}
              rows={4}
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder={t("form.detailsPlaceholder")}
              disabled={submitting}
            />
            <p className="text-xs text-muted-foreground">
              {t("form.counter", {
                count: values.description.length,
                max: 1000,
              })}
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor={"college"}>{t("form.college")}</Label>
            <Select
              aria-label={t("form.collegeLabel")}
              className="w-full"
              placeholder={t("form.selectCollege")}
              selectedKey={values.collegeId ? String(values.collegeId) : null}
              onSelectionChange={(key) => update("collegeId", Number(key))}
              isDisabled={submitting}
            >
              <SelectTrigger id={"college"} className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {colleges.map((c) => (
                  <SelectItem key={c.id} id={String(c.id)}>
                    {college(c.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="contactNumber">{t("form.phone")}</Label>
            <Input
              id="contactNumber"
              dir="ltr"
              type="tel"
              autoComplete="tel"
              required
              value={values.contactNumber}
              onChange={(e) => update("contactNumber", e.target.value)}
              placeholder={t("form.phonePlaceholder")}
              pattern="^05\d{8}$"
              title={t("form.phoneHint")}
              disabled={submitting}
            />
            <p className="text-xs text-muted-foreground">
              {t("form.phonePublic")}
            </p>
          </div>

          {error && (
            <Alert variant="destructive" role="alert">
              <AlertDescription>{translateMessage(error)}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              isDisabled={submitting}
            >
              {t("common.cancel")}
            </Button>
            <Button type="submit" isDisabled={submitting} className="sm:flex-1">
              {submitting ? t("form.saving") : submitLabel}
            </Button>
          </div>
        </LocalizedForm>
      </CardContent>
    </Card>
  );
}

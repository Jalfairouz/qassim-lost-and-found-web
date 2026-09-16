"use client";
import LocalizedForm from "@/components/LocalizedForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/LocaleContext";
import { login as loginRequest } from "@/lib/api";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { t, translateMessage, errorText } = useI18n();

  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { token } = await loginRequest({ email, password });
      login(token);
      router.push("/");
    } catch (err) {
      setError(errorText(err, "errors.login"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <h1 className="text-2xl font-semibold">{t("auth.welcome")}</h1>
          <CardDescription>{t("auth.loginDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <LocalizedForm onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={"email"}>{t("auth.email")}</Label>
              <Input
                id="email"
                dir="ltr"
                autoComplete="email"
                type={"email"}
                placeholder={t("auth.emailPlaceholder")}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={"password"}>{t("auth.password")}</Label>
              <div className="relative">
                <Input
                  id="password"
                  dir="ltr"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth.passwordPlaceholder")}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? t("common.hide") : t("common.show")}
                </button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{translateMessage(error)}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" isDisabled={loading}>
              {loading ? t("auth.loggingIn") : t("nav.login")}
            </Button>
          </LocalizedForm>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              {t("auth.noAccount")}{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
              >
                {t("nav.register")}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

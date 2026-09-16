"use client";
import ConfirmDialog from "@/components/ConfirmDialog";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/LocaleContext";
import { getPosts, request } from "@/lib/api";
import { Post } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ClipboardList,
  Search,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";

function AdminNavigation({
  tab,
  onSelect,
}: {
  tab: string;
  onSelect: (value: string) => void;
}) {
  const { t, dir } = useI18n();

  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar
      side={dir === "rtl" ? "right" : "left"}
      dir={dir}
      className="top-20 h-[calc(100svh-5rem)]"
    >
      <SidebarHeader className="p-6">
        <ShieldCheck aria-hidden className="mb-2 size-7" />
        <p className="font-semibold">{t("admin.name")}</p>
        <p className="text-xs text-sidebar-foreground/70">{t("brand.name")}</p>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarMenu>
          {[
            { id: "posts", label: t("search.allReports"), icon: ClipboardList },
            { id: "users", label: t("admin.users"), icon: Users },
          ].map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={tab === item.id}
                onPress={() => {
                  onSelect(item.id);
                  setOpenMobile(false);
                }}
              >
                <item.icon aria-hidden />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
interface AdminUser {
  id: string;
  email: string;
}

export default function AdminPage() {
  const { t, date, college, errorText } = useI18n();

  const router = useRouter();
  const { user, token, isAdmin, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/");
    }
  }, [authLoading, user, isAdmin, router]);

  useEffect(() => {
    if (!user || !isAdmin || !token) return;

    Promise.all([
      getPosts(),
      request<AdminUser[]>("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(([allPosts, allUsers]) => {
        setPosts(allPosts);
        setUsers(allUsers);
      })
      .catch(() => setError(t("errors.admin")))
      .finally(() => setLoading(false));
  }, [user, isAdmin, token, t]);

  async function handleDelete(id: number) {
    if (!token) return;

    setDeleting(true);
    try {
      await request<void>(`/admin/posts/${id}`, {
        method: t("common.delete"),
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setDeleteDialogOpen(false);
    } catch (err) {
      setError(errorText(err, "errors.delete"));
    } finally {
      setDeleting(false);
    }
  }

  const [tabValue, setTabValue] = useState("posts");

  if (authLoading || loading) {
    return (
      <div className="min-h-screen">
        <PageHeader title={t("admin.title")} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <LoadingState type="card" count={3} />
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const visiblePosts = posts.filter((p) =>
    (p.title + " " + p.collegeName)
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const visibleUsers = users.filter((u) =>
    (u.email + " " + u.id).toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <SidebarProvider className="min-h-[calc(100svh-5rem)]">
      <AdminNavigation
        tab={tabValue}
        onSelect={(value) => {
          setTabValue(value);
          setSearch("");
        }}
      />
      <div className="min-w-0 flex-1 p-4 sm:p-8">
        <div className="mb-7 flex items-center gap-3">
          <SidebarTrigger />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal">
              {t("admin.community")}
            </p>
            <h1 className="text-2xl font-bold sm:text-3xl">
              {t("admin.title")}
            </h1>
          </div>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <StatCard
            label={t("stats.total")}
            value={posts.length}
            icon="ClipboardList"
            description={t("admin.reportDescription")}
          />
          <StatCard
            label={t("admin.users")}
            value={users.length}
            icon="Users"
            tone="teal"
            description={t("admin.userDescription")}
          />
        </div>
        {error && <ErrorState message={error} />}
        <section className="rounded-2xl border bg-card shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b p-5">
            <h2 className="text-lg font-semibold">
              {tabValue === "posts" ? t("search.allReports") : t("admin.users")}
            </h2>
            <div className="relative">
              <Search
                aria-hidden
                className="absolute start-3 top-3 size-4 text-muted-foreground"
              />
              <input
                aria-label={
                  tabValue === "posts"
                    ? t("admin.searchReports")
                    : t("admin.searchUsers")
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("admin.searchPlaceholder")}
                className="h-10 w-full rounded-lg border bg-background ps-9 pe-3 text-sm"
              />
            </div>
          </div>
          {tabValue === "posts" ? (
            <Table aria-label={t("browse.community")}>
              <TableHeader>
                <TableHead isRowHeader>{t("admin.report")}</TableHead>
                <TableHead>{t("admin.type")}</TableHead>
                <TableHead>{t("admin.college")}</TableHead>
                <TableHead>{t("report.reported")}</TableHead>
                <TableHead>{t("admin.actions")}</TableHead>
              </TableHeader>
              <TableBody renderEmptyState={() => t("empty.reports")}>
                {visiblePosts.map((post) => (
                  <TableRow key={post.id} id={post.id}>
                    <TableCell>
                      <Link
                        href={`/posts/${post.id}`}
                        className="block max-w-64 truncate font-medium hover:underline"
                      >
                        {post.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <StatusBadge type={post.type} size="sm" />
                    </TableCell>
                    <TableCell>{college(post.collegeName)}</TableCell>
                    <TableCell>{date(post.createdAt)}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        aria-label={t("admin.deleteLabel", {
                          title: post.title,
                        })}
                        onPress={() => {
                          setDeletingId(post.id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 aria-hidden className="size-4" />
                        {t("common.delete")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table aria-label={t("admin.registeredUsers")}>
              <TableHeader>
                <TableHead isRowHeader>{t("auth.email")}</TableHead>
                <TableHead>{t("admin.userId")}</TableHead>
              </TableHeader>
              <TableBody renderEmptyState={() => t("empty.users")}>
                {visibleUsers.map((u) => (
                  <TableRow id={u.id} key={u.id}>
                    <TableCell>
                      <bdi dir="ltr">{u.email}</bdi>
                    </TableCell>
                    <TableCell>{u.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>
      </div>
      <ConfirmDialog
        open={deleteDialogOpen}
        title={t("dialog.delete")}
        description={t("dialog.deleteDescription")}
        confirmLabel={t("common.delete")}
        isDestructive
        isLoading={deleting}
        onConfirm={() => {
          if (deletingId !== null) void handleDelete(deletingId);
        }}
        onCancel={() => {
          if (!deleting) {
            setDeleteDialogOpen(false);
            setDeletingId(null);
          }
        }}
      />
    </SidebarProvider>
  );
}
